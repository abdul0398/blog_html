let allBlogs = [];
let selectedDates; 
let isCarousel;
(async()=>{
    $('#date').datepicker({
        startView: 0,
        minViewMode: 0,
        maxViewMode: 2,
        multidate: true,
        multidateSeparator: "-",
        autoClose: false, // Change autoClose to false
        beforeShowDay: highlightRange,
    }).on("changeDate", function(event) {
        selectedDates = event.dates
        var dates = event.dates,
            elem = $('#date');
        if (elem.data("selecteddates") == dates.join(",")) return;
        if (dates.length > 2) dates = dates.splice(dates.length - 1);
        dates.sort(function(a, b) { return new Date(a).getTime() - new Date(b).getTime() });
        elem.data("selecteddates", dates.join(",")).datepicker('setDates', dates);
    
        // Close the datepicker if two dates are selected
        if (dates.length === 2) {
            filterHandler();
            elem.datepicker('hide');
        }
    });



    
    


    function highlightRange(date) {
        var selectedDates = $('#date').datepicker('getDates');
        if (selectedDates.length === 2 && date >= selectedDates[0] && date <= selectedDates[1]) {
            return 'highlighted';
        }
        return '';
    }

    const debounceSearchHandler = debounce(filterHandler, 1000)
    const input_search = document.querySelector('#search');
    input_search.addEventListener("input", debounceSearchHandler);

    $('#reset-btn').on('click', function() {
        let elem = $('#date');
        elem.datepicker('clearDates');
        elem.data("selectedDates", "");
        elem.datepicker('hide'); 
        selectedDates = undefined;
        $("#search").val("");
        populateArticles(allBlogs);
        startCarousel();
    });

    const response = await fetch("https://blog.jomejourney-portal.com/api/blogs/fetch?less=true&limit=100");
    const data = await response.json()
    allBlogs = data.blogs
    populateArticles(allBlogs);
    startCarousel();
})()



function filterHandler() {
    let startDate = Number.MIN_SAFE_INTEGER;
    let endDate = Number.MAX_SAFE_INTEGER
    if(selectedDates){
        startDate = new Date(selectedDates[0])
        endDate = new Date(selectedDates[1])
    }

    const value = document.querySelector("#search").value.toLowerCase();

    const filteredBlogs = allBlogs.filter(blog=>{
        const heading = blog?.heading.toLowerCase()
        const blogDate = new Date(blog.created_at);
        if(heading.includes(value)  && (blogDate >= startDate && blogDate <= endDate)){
            return true;
        }
    })

    populateArticles(filteredBlogs);
    startCarousel()
}


async function populateArticles(blogs){
    const blog_container = document.getElementById("blogs-container");
    blog_container.innerHTML = ""
    for (let i = 0; i < blogs.length; i++) {
        const blog = blogs[i];
        let active;
        if(i == 0){
            active = "active"
        }

        blog_container.innerHTML += `
            <div class="mx-2">
                <div class="blogs-cards">
                    <div class="blogs-thiumbnail">
                        <a href="single-post/single-post-page/?id=${blog.id}" target="_blank"><img src="${blog.featImg}" alt=""></a>
                    </div>
                    <div class="blogs-content-container">
                        <p>
                            <span class="category">Latest News Articles</span>
                        </p>
                        <div class="post-title">
                            <h4 class="title"><a href="single-post/single-post-page/?id=${blog.id}" target="_blank">${blog.heading}</a></h4>
                        </div>
                        <p class="date">${blog.created_at.split("T")[0]}</p>
                    </div>
                </div>
            </div>
        `
    }
}


function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}


function startCarousel() {
    if(isCarousel){
        $('.glide').slick('unslick');
    }
    
    isCarousel = true;
    $('.glide').slick({
        // Slick options
        dots: false,
        infinite: true,
        arrows:true,
        speed: 300,
        slidesToShow: 4,
        adaptiveHeight: true,
        autoplay: true,    
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    });
}