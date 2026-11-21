import { Catch,ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Observable,throwError } from "rxjs";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter
{
    catch(exception: RpcException, host: ArgumentsHost){
       
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        response.status(401).json(
            {
                status: 401,
                message: 'Hola mundo, saludos a todos'

            });
    }
}