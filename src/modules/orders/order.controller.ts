import {
    Controller,
    Get,
    HttpStatus,
    Put,
    Param,
    BadRequestException,
    Body,
    Post,
    ParseIntPipe,
    HttpCode,
    Delete
} from '@nestjs/common';
import { OrdersService } from './order.service'
import { CreateOrderDto, UpdateOrderDto } from './dto'


@Controller('/orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async list(
    ) {
        const orders = await this.ordersService.list()

        return {
            status: HttpStatus.OK,
            content: orders
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async find(
        @Param('id', ParseIntPipe) id: number,
    ) {
        const order = await this.ordersService.findById(id)

        if (!order) {
            throw new BadRequestException('[orders] - order not found')
        }

        return {
            status: HttpStatus.OK,
            content: order
        }
    }

    @Post('')
    @HttpCode(HttpStatus.ACCEPTED)
    async create(
        @Body() createOrderDto: CreateOrderDto,
    ) {
        const order = await this.ordersService.create(createOrderDto)

        return {
            status: HttpStatus.ACCEPTED,
            content: order
        }
    }

    @Post('bulk')
    @HttpCode(HttpStatus.ACCEPTED)
    async bulk(@Body() orders: CreateOrderDto[]) {
        for (let order of orders) {
            await this.ordersService.create(order)
        }

        return {
            status: HttpStatus.ACCEPTED
        }
    }

    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOrderDto: UpdateOrderDto,
    ) {

        const order = await this.ordersService.findById(id)

        if (!order) {
            throw new BadRequestException('[orders] - order not found')
        }

        await this.ordersService.update(id, updateOrderDto)

        return {
            status: HttpStatus.ACCEPTED
        }
    }

    @Delete('/delete/:id')
    @HttpCode(HttpStatus.OK)
    async delete(
        @Param('id', ParseIntPipe) id: number
    ) {
        await this.ordersService.delete(id)

        return {
            status: HttpStatus.OK,
        }
    }
}