import { Controller, Get } from "@nestjs/common";
import { QaserviceService } from "./qaservice.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('qa')
@ApiTags('qa')
export class QController{
    constructor(
        private readonly qaService: QaserviceService
    ){}



}