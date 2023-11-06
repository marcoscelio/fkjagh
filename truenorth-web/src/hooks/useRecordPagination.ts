
import { useFindRecordsQuery } from "../state/api/api";


const LIMIT = 10;
interface RecordPaginationOptions {
    offset: number;
    limit: number
    total: number
}

const useRecordPagination = ({ offset, limit = LIMIT }: RecordPaginationOptions) => {
    if (!offset || !limit) throw new Error("Records not found");

    const result = useFindRecordsQuery({
        offset,
        limit,
    });
    return result;
};

export default useRecordPagination;
