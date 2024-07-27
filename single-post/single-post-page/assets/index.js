( async()=>{

    const url = new URL(window.location)
    const searchParams = url.searchParams;
    const id = searchParams.get("id")

    const response = await fetch(`https://blog.jomejourney-portal.com/api/article/fetch/${id}`)

    const data = await response.json()
    const blog = data.data
    
    const content = blog.content
    const heading = blog.heading
    const createdAt = blog.created_at
    const content_container = document.querySelector(".single-post-dull-content-wrapper")

    document.querySelectorAll(".single-post-title")[1].textContent = heading
    content_container.innerHTML = content
    document.querySelector(".date").textContent = createdAt.split('T')[0];

    await populateRelated()

    const images = content_container.querySelectorAll("img")

    console.log(images);
    for (const image of images) {
        image.style.width = "100%"
        if(window.screen.width <=600){
            image.style.height = "400px"
        }
    }


})()



async function populateRelated(){
    const response = await fetch(`https://blog.jomejourney-portal.com/api/blogs/fetch?less=true&limit=3`)

    const data = await response.json()
    const blogs = data.blogs

    const related_container = document.getElementById('related-post');
    related_container.innerHTML = "";

    for (let i = 0; i < blogs.length && i < 3; i++) {
        const blog = blogs[i];
        related_container.innerHTML += `
         <div class="col">
            <div class="blogs-cards">
                <div class="blogs-thiumbnail">
                    <a href="?id=${blog.id}"><img src="${blog.featImg}" alt=""></a>
                </div>
                <div class="blogs-content-container">
                    <p>
                        <span class="category">PROPNEX PICKS</span>
                    </p>
                    <div class="post-title">
                        <h4 class="title"><a href="?id=${blog.id}">${blog.heading}e</a></h4>
                    </div>
                    <p class="date">${blog.created_at.split("T")[0]}</p>

                </div>
            </div>
        </div>
        `

        
    }


}


