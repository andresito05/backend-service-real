import { Request, Response } from "express"; 
import { AppDataSource } from "../data-source";
import { Juegosya } from "../entities/Juegosya";

const productRepository = AppDataSource.getRepository(Juegosya); 

// GET - obtener todos los productos 
export const getAllJuegosya = async ( req: Request, res: Response) => {
    try {
        const product = await productRepository.find(); 
        res.json(product);
    } catch (error) {
    res.status(500).json({ message: "Error al obtener productos."}); 
    }
};

// GET by ID - obtener productos por ID 
export const getJuegosyaById = async( req: Request, res: Response) => {
    try {
        const product = await productRepository.findOneBy({
            id: parseInt(req.params.id), 
        }); 
        if(product){ 
            res.json(product); 
        } else {
            res.status(404).json ({ message: "Producto no encontrado"}); 
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto"}); 
    }
}; 

// POST crear un nuevo producto 
export const createJuegosya = async(req: Request, res: Response) =>{
    try {
        const { name,description,price,genero} = req.body;
        const product = new Juegosya(); 
        product.name = name; 
        product.description = description;
        product.price = price; 
        product.genero = genero; 

        await productRepository.save(product);
        res.status(201).json(product);
    } catch(error) {
        res.status(500).json({ message: "Error al crear el producto."}); 
    }
}; 

//PUT Actualizar un producto existente 
export const updateJuegosya = async(req: Request, res: Response) => {
    try {
        const { name,description,price,genero} = req.body; 
        const product = await productRepository.findOneBy({
            id: parseInt(req.params.id), 
        }); 

        if(product) {
            product.name = name ?? product.name;
            product.description = description ?? product.description;
            product.price = price ?? product.price; 
            product.genero = genero ?? product.genero;
            
            await productRepository.save(product);
            res.json(product);
        } else {
            res.status(404).json({ message: "Producto no encontrado."});
        }
    } catch(error) {
        res.status(500).json({ message: "Erro al actualizar el producto."});
    }
}; 

//DELETE borrar un producto 
export const deleteJuegosya = async(req: Request, res: Response) =>{
    try {
        const product = await productRepository.findOneBy({
            id: parseInt(req.params.id), 
        }); 

        if (product) {
            await productRepository.remove(product)
            res.json({ message: "Producto eliminado"});
        } else {
            res.status(404).json({ message: "Producto no encontrado."}); 
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar."});
    }
};