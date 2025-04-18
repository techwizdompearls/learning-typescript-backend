/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as CharactersService from "./characters.service";
import { BaseCharacter, Character } from "./character.interface";

/**
 * Router Definition
 */

export const charactersRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

charactersRouter.get( "/", async (req: Request, res: Response) => {
    try {
        const characters: Character[] = await CharactersService.findAll();

        res.status(200).send(characters);
    }
    catch (e) {
        let message = e instanceof Error ? e.message : String(e);
        res.status(500).send(message);
    }
});

// GET items/:id

charactersRouter.get( "/:id", async (req: Request, res: Response) => {
    const id: number = parseInt( req.params.id, 10 );

    try {
        const character: Character = await CharactersService.find( id );

        res.status(200).send(character);
    }
    catch (e) {
        let message = e instanceof Error ? e.message : String(e);
        res.status(500).send(message);
    }
});

// POST items

charactersRouter.post( "/", async (req: Request, res: Response) => {
    try {
        const character: BaseCharacter = req.body;
        const newCharacter: Character = await CharactersService.create(character);

        res.status(201).json(newCharacter);
    }
    catch (e) {
        let message = e instanceof Error ? e.message : String(e);
        res.status(500).send(message);
    }
});

// PUT items/:id

charactersRouter.put( "/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const update: BaseCharacter = req.body;
        const updatedCharacter = await CharactersService.update(id, update);
        
        if (!updatedCharacter) {
            const newCharacter: Character = await CharactersService.create(update);
            res.status(201).json(newCharacter);
        }
        else{
            res.status(200).json(updatedCharacter);
        }
    }
    catch (e) {
        let message = e instanceof Error ? e.message : String(e);
        res.status(500).send(message);
    }
});

// DELETE items/:id
charactersRouter.delete( "/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt( req.params.id, 10 );
        await CharactersService.remove( id );

        res.sendStatus(204);
    }
    catch (e) {
        let message = e instanceof Error ? e.message : String(e);
        res.status(500).send(message);
    }
});