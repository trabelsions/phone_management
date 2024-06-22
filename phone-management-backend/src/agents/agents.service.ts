import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private agentRepository: Repository<Agent>,
  ) {}
  async search(name: string): Promise<Agent[]> {
    const query = this.agentRepository.createQueryBuilder('agent');


      query.andWhere('agent.name LIKE :name or agent.group LIKE :name ', { name: `%${name}%` });




    return await query.getMany();
  }
    async filterAgents(
    name?: string,
    dateStart?: string,
    dateEnd?: string,
    email?: string,
  ): Promise<Agent[]> {
    const query = this.agentRepository.createQueryBuilder('agent');

 

    if (dateStart) {
      query.andWhere('agent.registrationDate <= :dateStart', { dateStart: `%${dateStart}%` });
    }
    if (name) {
      query.andWhere('agent.name LIKE :name', { name: `%${name}%` });
    }
    if (dateEnd) {
      query.andWhere('agent.registrationDate >= :phoneNumber', { dateEnd: `%${dateEnd}%` });
    }

   

    return await query.getMany();

  }
  async create(agent: Agent): Promise<Agent> {
    try {
      return await this.agentRepository.save(agent);
    } catch (error) {
      // Handle or log the error as needed
      throw new Error(`Could not create agent: ${error.message}`);
    }
  }

  async findAll(): Promise<Agent[]> {
    try {
      return await this.agentRepository.find();
    } catch (error) {
      // Handle or log the error as needed
      throw new Error(`Could not find agents: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Agent> {
    try {
      return await this.agentRepository.findOne({ where: { id } });
    } catch (error) {
      // Handle or log the error as needed
      throw new Error(`Could not find agent with id ${id}: ${error.message}`);
    }
  }
 async update(id: number, agent: Agent): Promise<{ status: string; updatedAgent?: Agent }> {
    try {
      const updateResult = await this.agentRepository.update(id, agent);
      console.log('updateResult',updateResult)
      if (updateResult.affected > 0) {
        console.log('im in update resutlt')
        const updatedAgent = await this.agentRepository.findOne({ where: { id } });
        console.log('updatedAgent', updatedAgent)
        return {status: '200', updatedAgent: updatedAgent};
      } else {
        return { status: 'not found' };
      }
    } catch (error) {
      // Handle or log the error as needed
      throw new Error(`Could not update agent with id ${id}: ${error.message}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.agentRepository.delete(id);
    } catch (error) {
      // Handle or log the error as needed
      throw new Error(`Could not delete agent with id ${id}: ${error.message}`);
    }
  }
  async findGroups(): Promise<string[]> {
    try {
      console.log("Groups:");

      const query = this.agentRepository.createQueryBuilder('agent')
      .select('DISTINCT(agent.group)', 'group'); // Specify DISTINCT and alias it as 'group'

    const results = await query.getRawMany(); // Use getRawMany() to get raw results as objects

    const groups = results.map(result => result.group);

    console.log("Groups:", groups);
    return groups;
    
      } catch (error) {
        console.log("result " , error)

      // Handle or log the error as needed
      throw new Error(`Could not find groups: ${error.message}`);
    }
  }
}
