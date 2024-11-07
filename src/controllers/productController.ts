import { Request, Response } from "express"; 
import { AppDataSource } from "../data-source";
import { Juegosya } from "../entities/products";

const productRepository = AppDataSource.getRepository(Juegosya); 

// GET - obtener todos los productos 
export const getAllProducts = async ( red: Request, res: Response) => {
    try {
        const Juegosya = await productRepository.find(); 
        res.json(Juegosya);
    } catch (error) {
    res.status(500).json({ message: "Error al obtener productos."}); 
    }
};

// GET by ID - obtener productos por ID 
export const getProductById = async( req: Request, res: Response) => {
    try {
        const Juegosya = await productRepository.findOneBy({
            id: parseInt(req.params.id), 
        }); 
        if(Juegosya){ 
            res.json(Juegosya); 
        } else {
            res.status(404).json ({ message: "Producto no encontrado"}); 
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto"}); 
    }
}; 

// POST crear un nuevo producto 
export const createProduct = async(req: Request, res: Response) =>{
    try {
        const { name,description,price,genero} = req.body;
        const juegosya = new Juegosya(); 
        juegosya.name = name; 
        juegosya.description = description;
        juegosya.price = price; 
        juegosya.genero = genero; 

        await productRepository.save(juegosya);
        res.status(201).json(juegosya);
    } catch(error) {
        res.status(500).json({ message: "Error al crear el producto."}); 
    }
}; 

//PUT Actualizar un producto existente 
export const updateProduct = async(req: Request, res: Response) => {
    try {
        const { name,description,price,genero} = req.body; 
        const Juegosya = await productRepository.findOneBy({
            id: parseInt(req.params.id), 
        }); 

        if(Juegosya) {
            Juegosya.name = name ?? Juegosya.name;
            Juegosya.description = description ?? Juegosya.description;
            Juegosya.price = price ?? Juegosya.price; 
            Juegosya.genero = genero ?? Juegosya.genero;
            
            await productRepository.save(Juegosya);
            res.json(Juegosya);
        } else {
            res.status(404).json({ message: "Producto no encontrado."});
        }
    } catch(error) {
        res.status(500).json({ message: "Erro al actualizar el producto."});
    }
}; 

//DELETE borrar un producto 
export const deleteProduct = async(req: Request, res: Response) =>{
    try {
        const Juegosya = await productRepository.findOneBy({
            id: parseInt(req.params.id), 
        }); 

        if (Juegosya) {
            await productRepository.remove(Juegosya)
            res.json({ message: "Producto eliminado"});
        } else {
            res.status(404).json({ message: "Producto no encontrado."}); 
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar."});
    }
};