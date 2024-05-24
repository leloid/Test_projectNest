import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    priority: number;

    @Column()
    userId: number;
}
