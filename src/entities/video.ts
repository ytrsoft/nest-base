import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@Entity()
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  @IsNumber()
  @IsNotEmpty()
  flag!: number;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  tag!: string;

  @Column({ nullable: false })
  @IsNumber()
  @IsNotEmpty()
  thumb!: number;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  m3u8!: string;
}