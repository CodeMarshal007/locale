// lgaController.ts
import { Request, Response } from 'express';
import LGA, { ILGA } from '../models/LGA';
import State, { IState } from '../models/State';

// Controller function to add a new LGA
export const addLGA = async (req: Request, res: Response) => {
  const { name, stateId, metadata } = req.body;

  try {
    const lga = new LGA({
      name,
      state: stateId,
      metadata,
    });

    const savedLGA = await lga.save();
    res.status(201).json({ lga: savedLGA });
  } catch (error) {
    res.status(500).json({ message: 'Error adding LGA' });
  }
};

// Controller function to get all LGAs
export const getLGAs = async (req: Request, res: Response) => {
  try {
    const lgas: ILGA[] = await LGA.find();
    const populatedLGAs: ILGA[] = await Promise.all(
      lgas.map(async (lga) => {
        const populatedLGA: ILGA = lga.toObject();
       const state: IState | null = await State.findById(lga.state);
        populatedLGA.state = state ? state.name : lga.state; // Replace with the actual state name
        // Populate metadata based on your implementation
        populatedLGA.metadata = lga.metadata;
        return populatedLGA;
      })
    );
    res.json({ lgas: populatedLGAs });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving LGAs' });
  }
};
