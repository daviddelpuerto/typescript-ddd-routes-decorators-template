import { Router, AllowedMethods } from '../Router';

export enum RoutesMetadataKeys {
  BASE_PATH = 'base_path',
  ROUTERS = 'routers',
}

const methodDecoratorFactory = (method: AllowedMethods) => {
  return (path: string): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor;
      const routers: Router[] = Reflect.hasMetadata(RoutesMetadataKeys.ROUTERS, controllerClass) ? Reflect.getMetadata(RoutesMetadataKeys.ROUTERS, controllerClass) : [];

      routers.push({
        method,
        path,
        handlerName: propertyKey,
      });

      Reflect.defineMetadata(RoutesMetadataKeys.ROUTERS, routers, controllerClass);
    };
  };
};

export function Controller(basePath: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(RoutesMetadataKeys.BASE_PATH, basePath, target);
  };
}

export const Get = methodDecoratorFactory(AllowedMethods.GET);
export const Post = methodDecoratorFactory(AllowedMethods.POST);
export const Put = methodDecoratorFactory(AllowedMethods.PUT);
export const Patch = methodDecoratorFactory(AllowedMethods.PATCH);
export const Delete = methodDecoratorFactory(AllowedMethods.DELETE);