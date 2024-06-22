import { Controller,Query, Get, Post, Body, Put, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Agent } from './agent.entity';
import { AgentService } from './agents.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  async create(@Body() agent: Agent): Promise<Agent> {
    try {
      return await this.agentService.create(agent);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard) 
  async findAll(): Promise<Agent[]> {
    try {
      return await this.agentService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('agent/:id')
  @UseGuards(JwtAuthGuard) 
  async findOne(@Param('id') id: number): Promise<Agent> {
    try {
      return await this.agentService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard) 

  async update(@Param('id') id: number, @Body() agent: Agent): Promise<void> {
    try {
      await this.agentService.update(id, agent);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
@Get('search/:name')
  search(@Param('name') name: string): Promise<Agent[]> {
    return this.agentService.search(name);
  }

  @Get('groups')
  groups(): Promise<string[]> {
    return this.agentService.findGroups();
  }
  @Get('filter')
  filterAgents(
    @Query('name') name: string,
    @Query('group') group: string,
    @Query('phoneNumber') phoneNumber: string,
    @Query('email') email: string,
  ): Promise<Agent[]> {
    return this.agentService.filterAgents(name, group, phoneNumber, email);
  }
  @Delete('/:id')
  @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to protect this endpoint
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.agentService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
