import { Request, Response } from 'express';
import { prisma } from '@shared/prisma';
import { handleTryCatch } from '@shared/utils/try-catch-utils';
import { EnvironmentEnv } from '@prisma/generated/client';

export class EnvironmentEnvController {
  static async createEnvironmentEnv(
    req: Request<Record<string, never>, unknown, EnvironmentEnv>,
    res: Response
  ): Promise<Response> {
    const [result, error] = await handleTryCatch(
      prisma.environmentEnv.create({
        data: req.body,
      })
    );

    if (error) {
      return res.status(500).json({ error: 'Failed to create environment variable' });
    }

    return res.status(201).json(result);
  }

  static async updateEnvironmentEnv(
    req: Request<{ id: string }, unknown, EnvironmentEnv>,
    res: Response
  ): Promise<Response> {
    const [result, error] = await handleTryCatch(
      prisma.environmentEnv.update({
        where: { id: req.params.id },
        data: req.body,
      })
    );

    if (error) {
      return res.status(500).json({ error: 'Failed to update environment variable' });
    }

    return res.status(200).json(result);
  }

  static async deleteEnvironmentEnv(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<Response> {
    const [, error] = await handleTryCatch(
      prisma.environmentEnv.delete({
        where: { id: req.params.id },
      })
    );

    if (error) {
      return res.status(500).json({ error: 'Failed to delete environment variable' });
    }

    return res.status(204).send();
  }

  static async getEnvironmentEnv(req: Request<{ id: string }>, res: Response): Promise<Response> {
    const [result, error] = await handleTryCatch(
      prisma.environmentEnv.findUnique({
        where: { id: req.params.id },
      })
    );

    if (error) {
      return res.status(500).json({ error: 'Failed to retrieve environment variable' });
    }

    return res.status(200).json(result);
  }

  static async getAllEnvironmentEnvs(req: Request, res: Response): Promise<Response> {
    const [result, error] = await handleTryCatch(prisma.environmentEnv.findMany());

    if (error) {
      return res.status(500).json({ error: 'Failed to retrieve environment variables' });
    }

    return res.status(200).json(result);
  }
}
