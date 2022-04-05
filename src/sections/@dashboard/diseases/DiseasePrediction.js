import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Prescription from "./Prescription";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";

function createData(name, netmeds, mg, pharmeasy) {
    return { name, netmeds,mg,pharmeasy};
  }

  function MyFormHelperText() {
    const { focused } = useFormControl() || {};
  
    const helperText = React.useMemo(() => {
      if (focused) {
        return "This field is being focused";
      }
  
      return "Helper text";
    }, [focused]);
  
    return <FormHelperText>{helperText}</FormHelperText>;
  }

export default function DiseasePrediction() {
  let myArray = [];
  const [rows,setRows]=useState(Array.from([
    createData('Medicine name', "netmeds", "1mg", "pharmeasy"),
  ]));
    const [medicines,setMedicines]=useState([]);
    const { register, handleSubmit } = useForm();
    const [result, setResult] = useState("");
    const [resultPercentage, setResultPercentage] = useState("");
    const [resultSpecialist, setResultSpecialist] = useState("");

    const onSubmit = (data) => {
        setResult("Loading ...");
        setResultPercentage("");
        setResultSpecialist("");
        let v;
        axios.post(
            // "http://localhost:5000/disease_prediction_using_symptoms",
            "https://medi-vhvn.herokuapp.com/disease_prediction_using_symptoms",
            { syms: data }
        ).then(function (response) {
            console.log(response);
            myArray = response.data.split("@");
            setMedicines(myArray[3].split(", "));
            console.log("these are medicines : " + medicines);
            // temp edits
            v = []
            for (let i = 0; i < medicines.length; i++) {
                v.push(createData(medicines[i], 'netmeds', 'mg', 'pharmeasy'));
            }
            //
            // setRows(Array.from([createData(medicines, 'netmeds', 'mg', 'pharmeasy'),]));
            setRows(v);
            console.log("these are rows",v);
            setResult(JSON.stringify(myArray[0]));
            setResultPercentage(JSON.stringify(myArray[1]));
            setResultSpecialist(JSON.stringify(myArray[2]));
        })
            .catch(function (error) {
                console.log(error);
            }).finally(() => {
                console.log("i should go second");
                // setRows(v);
                // setMedicines(medicines);
                console.log("these are medicines : " + medicines);
            });
  
    };
    return (
        <div>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <FormControl sx={{ width: "100%" }}>
                    <OutlinedInput {...register("symptoms")} placeholder="Please enter text" />
                    <MyFormHelperText />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
                <h1>{result}</h1>
                <h2>{resultPercentage}</h2>
                <h2>{resultSpecialist}</h2>
                <Prescription rows={rows} medicines={medicines} />
            </Box>
        </div>
    );
}