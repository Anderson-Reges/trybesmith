import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Iproduct, ProductId, ProductOrder } from '../interfaces/products.interface';

export default class Products {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<ProductOrder[]> {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.products',
    );
    const [rows] = result;
    return rows as ProductOrder[];
  }

  public async createNewProduct(product: Iproduct): Promise<ProductId> {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products (name, amount) VALUES (?,?)',
      [product.name, product.amount],
    );
    const [rows] = result;
    return { id: rows.insertId, ...product };
  }
}