import express, { Express } from 'express';
import { container } from '../dependency-injection';
import { Router } from '../../Shared/infrastructure/Router';
import { RoutesMetadataKeys } from '../../Shared/infrastructure/decorators/Routes';
import Logger from '../../Shared/infrastructure/Logger';

const logger = new Logger('Router');

export async function registerRoutes(server: Express) {

  const controllerServices = container.findTaggedServiceIds('controller');

  for (const controller of controllerServices) {
    const router = express.Router();

    const ControllerClass = controller?.definition?.Object;

    const controllerInstance = container.get(controller.id);

    const basePath: string = Reflect.getMetadata(RoutesMetadataKeys.BASE_PATH, ControllerClass);
    const routers: Router[] = Reflect.getMetadata(RoutesMetadataKeys.ROUTERS, ControllerClass);

    routers.forEach(({ method, path, handlerName }) => {
      router[method](path, controllerInstance[String(handlerName)].bind(controllerInstance));

      logger.info(`Registered route: {${method.toLocaleUpperCase()}, ${basePath}${path}}`);
    });

    server.use(basePath, router);
  }

}
