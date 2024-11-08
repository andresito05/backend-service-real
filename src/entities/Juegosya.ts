import { Column, Entity, PrimaryGeneratedColumn,} from "typeorm"; 

@Entity()
export class Juegosya { 
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @Column("text")
    description!: string; 

    @Column("decimal")
    price!: number;
    
   
}   
