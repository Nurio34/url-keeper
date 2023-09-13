

class UI {

    constructor(title,url,imgUrl) {
        this.title = title;
        this.url = url
        this.imgUrl = imgUrl
        // this.dataArr = []
        // this.list = document.querySelector(".list")
    }

    // storeData(title,url,imgUrl){
    //     axios.post("/api/v1/web",{
    //         title: title,
    //         url : url,
    //         imgUrl : imgUrl
    //     })
    //     .then(()=>this.getData())
    //     .then(()=> this.displayList())
    // }

    // getData() {
    //     axios.get("/api/v1/web")
    //     .then((res)=> {
    //         this.dataArr = res.data.datas
    //     })
    // }
    
    // displayList() {
    
    //     let result = ""
    
    //         this.dataArr.forEach(data=>{
                
    //             result += `
    //                 <div class="list-item data-id="${data._id}" ">
    //                     <img src="${data.imgUrl}" alt="" srcset="">
    //                     <li>
    //                         <a href="${data.url}">${data.title}</a>
    //                     </li>
    //                     <button type="button" class="updateBtn">Update</button>
    //                     <button type="button" class="deleteBtn">Delete</button>
    //                 </div>
    //             `
    //         })
                
    //         this.listEl.innerHTML = result
    // }
}

let dataArr = []

    window.addEventListener("DOMContentLoaded",()=>{
        getData()
    })

const addBtn = document.querySelector(".addBtn")

    addBtn.addEventListener("click", ()=> {

        //** getInfo() */ 
        const info = new UI(
            document.title,
            window.location.href,
            document.querySelector("link[rel~='icon']").href || document.querySelector("link[rel~='shortcut icon']").href
        )  

        const {title,url,imgUrl} = info
            
            // new UI().storeData(title,url,imgUrl)
            storeData(title,url,imgUrl)
        })
    


    // FUNCTIONS

function storeData(title,url,imgUrl){
    axios.post("/api/v1/web",{
        title: title,
        url : url,
        imgUrl : imgUrl
    })
    .then(()=>getData())
}

function getData() {
    axios.get("/api/v1/web")
    .then((res)=> {
        dataArr = res.data.datas
    })
    .then(()=> displayList())
}

function displayList() {
    const listEl = document.querySelector(".list")

    let result = ""

        dataArr.map(data=>{
            
            result += `
                <div class="list-item" data-id="${data._id}">
                    <img src="${data.imgUrl}" alt="" srcset="">
                    <li>
                        <a href="${data.url}">${data.title}</a>
                    </li>
                    <button type="button" class="updateBtn">Update</button>
                    <button type="button" class="deleteBtn">Delete</button>
                </div>
            `
        })
            
        listEl.innerHTML = result

    const deleteBtns = document.querySelectorAll(".deleteBtn")

        deleteBtns.forEach(btn=> btn.addEventListener("click",(e)=>{
            const id = e.target.parentElement.dataset.id
                deleteData(id)
        }))

    const updateBtns = document.querySelectorAll("updateBtn")

        updateBtns.forEach(btn => btn.addEventListener("click",(e)=> {
            const id = e.target.parentElement.dataset.id

            //** getInfo() */
            const info = new UI(
                document.title,
                window.location.href,
                document.querySelector("link[rel~='icon']").href || document.querySelector("link[rel~='shortcut icon']").href
            )  
    
            const {title,url,imgUrl} = info

                updateData(id)
        }))
}

function deleteData(id) {
    axios.delete(`/api/v1/web/?_id=${id}`)
    .then(()=> getData())
}

function updateData(id) {
    axios.patch(`/api/v1/web/?_id=${id}`,{
        title: title,
        url : url,
        imgUrl : imgUrl
    })
    .then(()=>getData())
}
