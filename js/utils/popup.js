

function getPopup(item_popup){
    return item_popup
}

var cart_popup = `<div class="content_items">
<div class="company_info">
    <!-- <div> <img src="/img/logo_apple.png" alt=""></div> -->
    <h2>ZEOPOS</h2>
    <p>09015121</p>
</div>
<div class="customer_bill">

    <div>
    <h6>Customer: </h6>
    <h6 class="name"></h6>
    </div>
    <div class="pay_bill">
    </div>
</div>
<div class="number_bill">
    <p class="id"></p>
    <p class="date"></p>
</div>
<div class="table_items">
    <table>
        <thead>
            <tr>
                <td>#</td>
                <td>Items</td>
                <td>Qty</td>
                <td>Subtutol</td>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
    
</div>
<div class="total_bill">
    <div class="total_payment">
         <div class="total">
            <h6>Total</h6>
            <h6></h6>
        </div>
         <div class="payment">
            <h6 style="font-size: 12px; font-weight: 100">Payment</h6>
            <h6 style="font-size: 12px; font-weight: 100" class="payment_method"></h6>
         </div>
    </div>
    <div class="discount">
        <h6>Discount</h6>
        <h6>78687070-7</h6> 
    </div>
    
</div>
</div>
<div class="bill_btns">
<button class="proceed btns">Proceed</button>
<button class="cancel btns">Cancel</button>
</div>`

var orders_popup = {
    getOne: `<div class="content_items">
    <div class="company_info">
        <!-- <div> <img src="/img/logo_apple.png" alt=""></div> -->
        <h2>ZEOPOS</h2>
        <p>09015121</p>
    </div>
    <div class="customer_bill">
    
        <div>
        <h6>Customer: </h6>
        <h6 class="name"></h6>
        </div>
        <div class="pay_bill">
        </div>
    </div>
    <div class="number_bill">
        <p class="id"></p>
        <p class="date"></p>
    </div>
    <div class="table_items">
        <table>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Items</td>
                    <td>Qty</td>
                    <td>Subtutol</td>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
        
    </div>
    <div class="total_bill">
        <div class="total_payment">
             <div class="total">
                <h6>Total</h6>
                <h6></h6>
            </div>
             <div class="payment">
                <h6 style="font-size: 12px; font-weight: 100">Payment</h6>
                <h6 style="font-size: 12px; font-weight: 100" class="payment_method"></h6>
             </div>
        </div>
        <div class="discount">
            <h6>Discount</h6>
            <h6>78687070-7</h6> 
        </div>
        
    </div>
    </div>
    
    <div class="list_action">
    
    
    
    <span class="status return delete">Delete</span>
    <span class="status PENDING cancel">Cancel</span>
    
    
    </div>`,

    delete: `<div><p>Do you want delete?</p></div>
             <div class="list_action"><span class="status return delete">Delete</span><span class="status PENDING cancel">Cancel</span></div>`
}

var customer_popup = {
    create: ` <div class="cardHeader">
    <h2>Create Customer</h2>
</div>
<div class="list_input_customer content_action">
    <div>
        <label for="">name</label>
        <input type="text" name="name" value="">
        <span></span>
    </div>
    <div>
        <label for="">Phone</label>
        <input type="text" name="phone_number" value="">
        <span></span>
    </div>
    <div>
        <label for="">Address</label>
        <textarea name="address" id="address" cols="30" rows="3"></textarea>
        <span></span>
    </div>  
</div>
<div class="border_span"></div>
<div class="list_action"><span class="status return proccess">Proccess</span><span class="status PENDING cancel">Cancel</span></div>`,
    delete: `<div><p>Do you want delete customer name: <span class="name">Simon</span></p></div>
             <div class="list_action"><span class="status return delete">Delete</span><span class="status PENDING cancel">Cancel</span></div>`,
    
    edit:  ` <div class="cardHeader">
        <h2>Edit Customer</h2>
    </div>
    <div class="list_input_customer content_action">
        <div>
            <label for="">name</label>
            <input type="text" name="name_edit" value="">
            <span></span>
        </div>
        <div>
            <label for="">Phone</label>
            <input type="text" name="phone_number_edit" value="">
            <span></span>
        </div>
        <div>
            <label for="">Address</label>
            <textarea name="address" id="address_edit" cols="30" rows="3"></textarea>
            <span></span>
        </div>  
    </div>
    <div class="border_span"></div>
    <div class="list_action"><span class="status return proccess">Proccess</span><span class="status PENDING cancel">Cancel</span></div>`,
    profile: `<div class="cardHeader">
    <h2>Customer</h2>
</div>
<div class="content_profile">
    <h4>Name: <span class="name">nam anh</span></h4>
    <h4>Phone: <span class="phone_number">0920327873</span></h4>
    <h4>Address: <span class="address">5 dhfs fhsds asdha sdu sas ad dasda dasd dasd dasd dasd dsad dad ad dad asd</span></h4>
    <h4>Created at: <span class="created_at">2022-12-02</span></h4>
</div>
<div class="border_span"></div>
<div class="list_action">


<span class="status PENDING edit">Edit</span>
<span class="status return delete">Delete</span>
<span class="status PENDING cancel">Cancel</span>

</div>`
    

}

var product_popup = {
    edit : `<div class="cardHeader">
    <h2>Product</h2>
</div>
<div class="list_input_customer list_input_product">
    <div>
        <label for="">name</label>
        <input type="text" class="pri_name nam" name="name">
        <span></span>
    </div>
    <div>
        <label for="">Price</label>
        <input type="text" class="pri_name price" name="price">
        <span></span>
    </div>
    <div>
        <label for="image">Cat</label>
        <input type="text" name="" class="option" list="categoryList">
        <datalist id="categoryList">
            <option value="volvo"></option>
            <option value="saab"></option>
            <option value="mercedes"></option>
            <option value="audi"></option>
        </datalist>
    </div>
    <div class="contai_file">
        <label for="">Image</label>
        <input type="file" id="upload" hidden/>
        <div class="label_choose"><label  for="upload">Choose file</label></div>
        <span></span>
    </div>
    
        
    
</div>
<div class="border_span"></div>
<div class="list_action"><span class="status PAID proccess">Proccess</span><span class="status PENDING cancel">Cancel</span></div>`,

profile: `<div class="cardHeader">
<h2>Customer</h2>
</div>
<div class="content_profile">
<img class="image" src="" alt="" height="50px" width="50px">
<h4>Name: <span class="name"></span></h4>
<h4>Price: <span class="price"></span></h4>
<h4>Category: <span class="category"></span></h4>
<h4>Created at: <span class="created_at"></span></h4>

</div>
<div class="border_span"></div>
<div class="list_action">


<span class="status PENDING edit">Edit</span>
<span class="status return delete">Delete</span>
<span class="status PENDING cancel">Cancel</span>

</div>`
}

