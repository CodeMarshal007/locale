
import { Request, Response } from 'express';
import State, { IState } from '../models/State';
import LGA from '../models/LGA';
import Region from '../models/Region';

// Controller function to add a new state
export const addState = async (req: Request, res: Response) => {
  const { name, regionId, metadata } = req.body;

  try {
    const state: IState = new State({
      name,
      region: regionId,
      metadata,
    });

    const savedState: IState = await state.save();
    res.status(201).json({ state: savedState });
  } catch (error) {
    res.status(500).json({ message: 'Error adding state' });
  }
};

// Controller function to get all states
export const getStates = async (req: Request, res: Response) => {
  try {
    const states: IState[] = await State.find();
    const populatedStates: IState[] = await Promise.all(
      states.map(async (state) => {
        const populatedState: IState = state.toObject();
        const region = await Region.findById(state.region);
        //@ts-ignore
        populatedState.region = region ? region.name as string : state.region; 
        populatedState.LGAs = (await LGA.find({ state: state._id }).select('name')).map((lga) => lga.name);
        return populatedState;
      })
    );
    res.json({ states: populatedStates });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving states' });
  }
};

// Controller function to get LGAs within a state
export const getLGAsByState = async (req: Request, res: Response) => {
  const stateId = req.params.stateId;

  try {
    const lgas = await LGA.find({ state: stateId });
    const populatedLGAs = await Promise.all(
      lgas.map(async (lga) => {
        const populatedLGA = lga.toObject();
        const state: IState | null = await State.findById(lga.state);
        populatedLGA.state = state ? state.name as string : lga.state; 
        populatedLGA.metadata = lga.metadata; 
        return populatedLGA;
      })
    );
    res.json({ lgas: populatedLGAs });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving LGAs' });
  }
};
