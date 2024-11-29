import morgan from "morgan";
import { ACCESS_LOG_FORMMAT } from "../utilities/constant";

export default morgan(ACCESS_LOG_FORMMAT);
