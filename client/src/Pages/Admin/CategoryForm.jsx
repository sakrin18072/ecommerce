import { toast } from "react-hot-toast";
import axios from "axios";
const CategoryForm = ({name,setName,handleSubmit}) => {
    
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Create Category</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn bg-blue-800 hover:bg-blue-500 text-white mt-3">
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
