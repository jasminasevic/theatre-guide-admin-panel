export class Logging {
    id: number;
    performer: string;
    useCaseName: string;
    loggingDate: Date;
    useCaseData: object;

    constructor(logging){
        this.id = logging.id;
        this.performer = logging.performer;
        this.useCaseData = logging.useCaseData;
        this.loggingDate = logging.loggingDate;
        this.useCaseData = logging.useCaseData;
    }
}