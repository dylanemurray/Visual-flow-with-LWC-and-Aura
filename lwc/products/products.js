import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import returnProducts from '@salesforce/apex/AccountOpportunities_lwc_Helper.returnProducts';
import { fireEvent } from 'c/pubsub';

const columns = [
    {label: 'Name', fieldName: 'Name', type: 'text'}
];

export default class Products extends LightningElement {
    recordIds = [];
    @wire(CurrentPageReference) pageRef;
    @track productList;
    @track columns = columns;
    @wire(returnProducts)
    returnProducts({error,data}){
        if(data){
            console.log('data');
            this.productList = data;
        }
        else if(error){
            console.log('error');
            this.productList = undefined;
        }
    }

    getRowId(event){
        const selectedRows = event.detail.selectedRows;
        let ids = new Set();
        for(let i =0; i < selectedRows.length; i++){
            ids.add(selectedRows[i].Id);
        }
        this.recordIds = Array.from(ids);
    }

    newOpp(){
        fireEvent(this.pageRef, 'passIds', this.recordIds);
    }
}