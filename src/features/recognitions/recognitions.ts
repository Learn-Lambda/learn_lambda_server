import { IsNumber, IsString } from "class-validator";
import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import {
  AccessLevel,
  CallbackFind,
  CallbackStrategyCreateDbModel,
  CallBackStrategyDeleteModelByQueryId,
  CallBackStrategyPagination,
  CallbackStrategyUpdateModel,
  callbackUpdateDelete,
  SubRouter,
} from "../../core/controllers/http_controller";
import { Prisma } from "@prisma/client";
import { ClassConstructor } from "class-transformer";
export class RecognitionCategoryModel {
  @IsString()
  helper: string;
  @IsString()
  comonCategory: string;
  @IsString()
  subCategory: string;
}
export class RecognitionCategoryEditModel extends RecognitionCategoryModel {
  @IsNumber()
  id: number;
}

class GetAllRecognitionCategory extends CallBackStrategyPagination<Prisma.RecognitionCategoryWhereInput> {
  dbCollectionName: string = "recognitionCategory";
}
class CreteNewRecognitionCategory extends CallbackStrategyCreateDbModel<RecognitionCategoryModel> {
  validationModel: ClassConstructor<RecognitionCategoryModel> =
    RecognitionCategoryModel;
  dbCollectionName: string = "recognitionCategory";
}
class EditRecognitionCategory extends CallbackStrategyUpdateModel<RecognitionCategoryEditModel> {
  dbCollectionName: string = "recognitionCategory";
  validationModel: ClassConstructor<RecognitionCategoryEditModel> =
    RecognitionCategoryEditModel;
}
class DeleteRecognitionCategory extends CallBackStrategyDeleteModelByQueryId {
  dbCollectionName: string = "recognitionCategory";
  deleteCallback = async (id: number) => {
    // await this.client.recognitionTask.deleteMany({ where: { categoryId: id } });
  };
}
class FindRecognitionCatogory extends CallbackFind {
  dbCollectionName: string = "recognitionCategory";
}
class RecognitionTaskModel {
  @IsNumber()
  categoryId: number;
}
class RecognitionTaskEditModel extends RecognitionTaskModel {
  @IsNumber()
  id: number;
}
class GetAllRecognitionTask extends CallBackStrategyPagination<any> {
  dbCollectionName: string = "recognitionCategory";
}
class CreateNewRecognitionTask extends CallbackStrategyCreateDbModel<RecognitionTaskModel> {
  validationModel: ClassConstructor<RecognitionTaskModel> =
    RecognitionTaskModel;
  dbCollectionName: string = "recognitionCategory";
}

class EditRecognitionTask extends CallbackStrategyUpdateModel<RecognitionTaskEditModel> {
  dbCollectionName: string = "recognitionCategory";
  validationModel: ClassConstructor<RecognitionTaskEditModel> =
    RecognitionTaskEditModel;
}
class DeleteRecognitionTask extends CallBackStrategyDeleteModelByQueryId {
  deleteCallback: callbackUpdateDelete;
  dbCollectionName: string = "recognitionCategory";
}

export class RecognitionsFeature extends FeatureHttpController {
  constructor() {
    super();
    this.subRoutes = [
      new SubRouter(
        "/recognition/category",
        new GetAllRecognitionCategory(),
        AccessLevel.public,
        "GET",
      ),
      new SubRouter(
        "/recognition/category",
        new CreteNewRecognitionCategory(),
        AccessLevel.admin,
        "POST",
      ),
      new SubRouter(
        "/recognition/category",
        new EditRecognitionCategory(),
        AccessLevel.admin,
        "PUT",
      ),
      new SubRouter(
        "/recognition/category",
        new DeleteRecognitionCategory(),
        AccessLevel.admin,
        "DELETE",
      ),
      new SubRouter(
        "/recognition/category/find",
        new FindRecognitionCatogory(),
        AccessLevel.public,
      ),

      new SubRouter(
        "/recognition/tasks",
        new GetAllRecognitionTask(),
        AccessLevel.public,
        "GET",
      ),
      new SubRouter(
        "/recognition/tasks",
        new CreateNewRecognitionTask(),
        AccessLevel.admin,
        "POST",
      ),
      new SubRouter(
        "/recognition/tasks",
        new EditRecognitionTask(),
        AccessLevel.admin,
        "PUT",
      ),
      new SubRouter(
        "/recognition/tasks",
        new DeleteRecognitionTask(),
        AccessLevel.admin,
        "DELETE",
      ),
    ];
  }
}
