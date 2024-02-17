import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import './css/ItemForm.css'
import {FaCircleArrowLeft} from "react-icons/fa6";
import {useNavigate, useParams} from "react-router-dom";

const ItemForm = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const {data: dataById} = useQuery({
        queryKey: ["GET_BY_ID"],
        queryFn: () => {
            return axios.get("http://localhost:8080/content/" + id)
        }, enabled: !!id
    })


    const {
        register,
        handleSubmit,
        // formState
    } = useForm({
        defaultValues: id ? dataById?.data : {},
        values: id ? dataById?.data : {},
    });


    const saveData = useMutation((requestData: any) => {
        return axios.post('http://localhost:8080/content/save', requestData)});


    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            saveData.mutate(data, {
                onSuccess() {
                    navigate("/admin")
                }
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <div className="admin-back">
            <a onClick={() => {
                navigate("/admin") }}><i><FaCircleArrowLeft size="2rem"/></i> Go Back</a>
            </div>

            <div className="content-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Upload Item Details:</h2>
                    <input type="text"  placeholder="title" {...register("itemTitle")}/>
                    <input type="url" placeholder="image"{...register("itemPhoto")}/>
                    <input type="text"  placeholder="price"  {...register("itemPrice")}/>
                    <select  {...register("categoryType")}>
                        <option value="">Select Category</option>
                        <option value="Dogs">Dogs</option>
                        <option value="Cats">Cats</option>
                    </select>
                    <select  {...register("subcategoryType")}>
                        <option value="">Select Sub-Category</option>
                        <option value="food&treats">Food & Treats</option>
                        <option value="toys&accessories">Toys & Accessories</option>
                        <option value="clothing">Clothing</option>
                        <option value="grooming&hygiene">Grooming & Hygiene</option>
                    </select>
                    <textarea placeholder="description"  {...register("itemDescription")}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default ItemForm;