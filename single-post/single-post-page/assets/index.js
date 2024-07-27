( async()=>{

    const url = new URL(window.location)
    const searchParams = url.searchParams;
    const id = searchParams.get("id")
    console.log(id);



    const response = await fetch(`https://blog.jomejourney-portal.com/api/blogs/fetch`)

    const data = await response.json()
    const blogs = data.blogs

    blogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    

    const blog = blogs.find((blog)=>{
        if(blog.id == id){
            return true
        }
    })
    
    
    const content = blog.content
    const heading = blog.heading
    const createdAt = blog.created_at

    document.querySelectorAll(".single-post-title")[1].textContent = heading
    document.querySelector(".single-post-dull-content-wrapper").innerHTML = content
    document.querySelector(".date").textContent = createdAt.split('T')[0];



    const related_container = document.getElementById('related-post');
    related_container.innerHTML = "";

    for (let i = 0; i < blogs.length && i < 3; i++) {
        const blog = blogs[i];
        related_container.innerHTML += `
         <div class="col">
            <div class="blogs-cards">
                <div class="blogs-thiumbnail">
                    <a href="/single-post/single-post-page/index.html?id=${blog.id}"><img src="${blog.featImg}" alt=""></a>
                </div>
                <div class="blogs-content-container">
                    <p>
                        <span class="category">PROPNEX PICKS</span>
                    </p>
                    <div class="post-title">
                        <h4 class="title"><a href="/single-post/single-post-page/index.html?id=${blog.id}">${blog.heading}e</a></h4>
                    </div>
                    <p class="date">${blog.created_at.split("T")[0]}</p>

                </div>
            </div>
        </div>
        `

        
    }




})()



