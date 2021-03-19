import {Request, Response} from "express";
import {Injectable} from "@nestjs/common";
import {GqlOptionsFactory, GqlModuleOptions} from "@nestjs/graphql";

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      debug: process.env.NODE_ENV !== "production",
      playground: process.env.NODE_ENV !== "production",
      context: ({req, res}: {req: Request; res: Response}): any => ({req, res}),
      autoSchemaFile: "./schema.gql",
    };
  }
}
