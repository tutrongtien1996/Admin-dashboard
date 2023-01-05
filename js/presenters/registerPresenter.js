
import { SampleProductRepository } from "../repositories/sampleProductRepository.js";
import { sharedPresenter } from "./sharedPresenter.js";

function start () {
    selectBusinessType();
}

start ();

function selectBusinessType (){
    let value_register = localStorage.getItem("register");
    if(value_register){
        sharedPresenter.handleDataSample();
    }
}