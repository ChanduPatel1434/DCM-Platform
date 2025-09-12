import { Link, Outlet } from "react-router-dom"
import BatchList from "./AllBatchs"

const Batch = () => {
  return <>

    <div className="content-page">
      <div className="content">  
          <BatchList/>

      </div>
    </div>

  </>
}
export default Batch