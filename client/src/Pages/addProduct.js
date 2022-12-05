import React, { useState } from "react";
import axios from "axios";
import { storage } from "../Storage/fireStorage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { editActions } from "../Redux/Features/toggleSlice";
import { useNavigate } from "react-router-dom";
import InputForm from "../Components/inputForm";

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toggle = useSelector((state) => state.toggleEdit.toggle);
    const inputEdit = useSelector((state) => state.editProductInfo.data);

    const [name, setName] = useState(toggle ? inputEdit.name : "");
    const [details, setDetails] = useState(toggle ? inputEdit.details : "");
    const [price, setPrice] = useState(toggle ? inputEdit.price : 0);
    const [quantity, setQuantity] = useState(toggle ? inputEdit.quantity : 0);
    const [location, setLocation] = useState(toggle ? inputEdit.location : "");
    const [catagories, setCatagories] = useState("fruits");
    const [types, setTypes] = useState("regular");
    const [url, setUrl] = useState(toggle ? inputEdit.url : "");

    //Uploading Files to Fire storage
    const fileHandler = (event) => {
        const imgFile = event.target.files[0];
        const imgRef = ref(storage, `Images/${imgFile.name}`);
        const uploadTask = uploadBytesResumable(imgRef, imgFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                toast.success(`Upload completed ${progress} %`);
            },
            () => {
                toast.error("Error! Something went wrong");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                });
            }
        );
    };
    //All the onChange finctions
    const handleTypes = (event) => {
        setTypes(event.target.value);
    };
    const handleCatagories = (event) => {
        setCatagories(event.target.value);
    };
    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleDetails = (event) => {
        setDetails(event.target.value);
    };
    const handleQuantity = (event) => {
        setQuantity(event.target.value);
    };
    const handlePrice = (event) => {
        setPrice(event.target.value);
    };
    const handleLocation = (event) => {
        setLocation(event.target.value);
    };
    const handleUrl = (event) => {
        setUrl(event.target.value);
    };

    //Product info object for DB
    const product = {
        name: name ? name : undefined,
        details: details ? details : undefined,
        price: price ? price : undefined,
        quantity: quantity ? quantity : undefined,
        location: location ? location : undefined,
        type: types ? types : undefined,
        catagory: catagories ? catagories : undefined,
        url: url ? url : undefined,
    };

    //Sending product to DB
    const addProduct = async (event) => {
        event.preventDefault();
        try {
            await axios.post(
                "https://inventory-manager-production.up.railway.app/",
                product
            );
            setName("");
            setDetails("");
            setPrice("");
            setQuantity("");
            setLocation("");
            setUrl("");
            toast.success("Successfully added the item");
        } catch {
            toast.error("Error! Something went wrong");
        }
    };
    //Edit product from DB
    const editProduct = async (event) => {
        event.preventDefault();
        try {
            await axios.put(
                `https://inventory-manager-server-jewel.herokuapp.com/${inputEdit.id}`,
                product
            );
            dispatch(editActions.editToggle());
            navigate("/");
        } catch {
            toast.error("Error! Something went wrong");
        }
    };

    return (
        <InputForm
            addProduct={addProduct}
            editProduct={editProduct}
            name={name}
            details={details}
            price={price}
            quantity={quantity}
            location={location}
            catagories={catagories}
            types={types}
            url={url}
            handleName={handleName}
            handleDetails={handleDetails}
            handlePrice={handlePrice}
            handleQuantity={handleQuantity}
            handleLocation={handleLocation}
            handleCatagories={handleCatagories}
            handleTypes={handleTypes}
            handleUrl={handleUrl}
            fileHandler={fileHandler}
        />
    );
};

export default AddProduct;
