import { Request, Response } from 'express';
import OrderService from '../services/orders.service';
import statusCodes from '../statusCodes';

export default class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public getAllOrders = async (_req: Request, res: Response) => {
    const { type, data } = await this.orderService.getAll();

    return type !== null
      ? res.status(statusCodes.INTERNAL_ERRO).json(data)
      : res.status(statusCodes.OK).json(data);
  };

  public createOrder = async (req: Request, res: Response) => {
    const loggedUser = req.user;
    const arrayIds = req.body;

    const { type, data } = await this.orderService.createOrder(arrayIds, loggedUser);

    return type !== null
      ? res.status(statusCodes.INTERNAL_ERRO).json(data)
      : res.status(statusCodes.CREATED).json(data);
  };
}