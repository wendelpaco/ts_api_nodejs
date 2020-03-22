import { ClienteInterface } from './../../../interface/Cliente/ICliente';
import { Request, Response } from 'express'
import Cliente from '../../models/Cliente/ClienteModel'
import { ClienteValidation } from '../../../libs/validation/Cliente/ClienteValidation';


class ClienteController {
    // retorna todos os clientes da base
    public async Index(req: Request, res: Response): Promise<Response> {
        try {
            const clienteFind = await Cliente.findById(req.userId, { password: 0 })
            if (!clienteFind) {
                return res.status(404).json({ codigo: 100, message: 'Nenhum cliente encontrado no sistema, por favor, cadastre um novo cliente.' })
            }
            const cliente = await Cliente.find().select('name cpf celular').populate('userId', 'username email')
            return res.send(cliente)

        } catch (e) {
            return res.status(400).json({ codigo: 106, message: e.message })
        }
    }
    // retorna os dados do cliente pesquisado
    public async Show(req: Request, res: Response): Promise<Response> {
        try {
            const cliente = await Cliente.findOne({ cpf: req.body.cpf }).populate('userId', 'username email') as ClienteInterface
            if (!cliente) return res.status(400).json({ codigo: 102, message: 'Cpf não encontrado no sistema.' })

            return res.send(cliente)
        } catch (e) {
            return res.status(400).json({ codigo: 106, message: e.message })
        }
    }
    // cadastra um cliente com base nas infoamações enviada
    public async Store(req: Request, res: Response): Promise<Response> {

        try {
            if (!req.body.name) return res.status(400).json({ codigo: 110, message: 'Nenhuma dado foi enviado para o cadastro' })
            const { error } = ClienteValidation(req.body)
            if (error) return res.status(400).json({ codigo: 101, message: error.message })

            const cliente = await Cliente.findOne({ cpf: req.body.cpf }) as ClienteInterface
            if (cliente) return res.status(400).json({ codigo: 108, message: 'CPF Já em uso. Por favor Utilize outro' })

            const newCliente: ClienteInterface = new Cliente({
                name: req.body.name,
                cpf: req.body.cpf,
                celular: req.body.celular,
                dataNascimento: req.body.dataNascimento,
                userId: req.userId
            })

            await newCliente.save()
            return res.send({ codigo: 103, message: 'Cliente cadastrado com sucesso!' })
        } catch (e) {
            return res.status(400).json({ codigo: 106, message: e.message })
        }
    }
    // altera o cadastro do cliente com base nas informações enviada
    public async Update(req: Request, res: Response): Promise<Response> {

        try {
            if (!req.body.name) return res.status(400).json({ message: 'Nenhuma dado foi enviado para a alteração' })

            const { id } = req.params
            const { name, cpf, celular, dataNascimento } = req.body

            await Cliente.findByIdAndUpdate(id, { name, cpf, celular, dataNascimento }) as ClienteInterface

            return res.json({ codigo: 103, message: `O cliente foi alterado com sucesso!` })
        } catch (e) {
            return res.status(400).json({ codigo: 106, message: e.message })
        }
    }
    // exclui o cadastro do cliente
    public async Destroy(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            await Cliente.findByIdAndDelete(id)
            return res.send({ codigo: 107, message: 'Cliente excluído com sucesso!' })
        } catch (e) {
            return res.status(400).json({ codigo: 106, message: e.message })
        }
    }
}

export default new ClienteController()