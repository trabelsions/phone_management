import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsEmail, IsBoolean, IsDate, IsNotEmpty } from 'class-validator';

@Entity()
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  group: string;

  @Column()
  @IsDate()
  @IsNotEmpty()
  registrationDate: Date;

  @Column()
  @IsBoolean()
  @IsNotEmpty()
  canCall: boolean;

  @Column()
  @IsString()
  @IsNotEmpty()
  photo: string;
}
