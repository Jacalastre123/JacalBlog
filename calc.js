let codes = [
    "#", "---", "|", "-", "##", "___", "*LIST", "*", "<=", "###", "-+-", "/+/"
]
let container = document.getElementById("container")
let inTable = false
let inTh = false
let table;
let tHead;
let lineArray = []
let tRow;
let tRow2;
let ul;
let menu;
let selection;
let newList;
let newSub;
let friction = 0
let colList = []
function loader(post) {
    container.innerHTML = ""
fetch(post + ".wtd")
.then(response => response.text())
.then(data => {
    const lines = data.split(/\r?\n/)

    let cmd;

    lines.forEach(line => {

        const part = line.split(" ")
         cmd = part[0]
      
        const args = part.slice(1).join(" ")
        
        if (codes.includes(cmd)) {
            switch(cmd) {

                case "___":
                   
                    container.appendChild(document.createElement("hr"))
                    break;

                case "-+-":
                    let classing = args.trim()
         
                     menu = document.createElement("div")
                                if (classing !== "") {
                        menu.className = classing
                    }
                   menu.innerHTML = "<h4>Table of Contents: </h4><hr>"
                   selection = container.querySelectorAll("h3")
                   container.appendChild(menu)
               
                  
                    
                    break;
                
               
               
                     case "##":
                    const subheadline = document.createElement("h2")
                    subheadline.innerText = args
                    container.appendChild(subheadline)
                    break;




                
                case "/+/":
                    selection = container.querySelectorAll("h2, h3")

                  
                   selection.forEach((item, index) => {
                    
                   

                        if (item.tagName === "H2") {       
                        newList = document.createElement("h4")
                          newList.onclick = function() {
                        item.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        })
                        

                    }
                       newList.innerText = item.textContent
newList.style.padding = "10px"
                        

                        newList.style.backgroundColor = "lightgrey"
                               
                              
                   
                        
                    menu.appendChild(newList)
                }

                        if (item.tagName === "H3") {  
                            friction++     
                    newSub = document.createElement("h4")
                        
                         
              
                        newSub = document.createElement("h5")
                          newSub.onclick = function() {
                        item.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        })
                       
                            
                        }
                         
                         newSub.innerText = item.textContent
                          menu.appendChild(newSub)
                        
                        
                    }}
                    )
                   

                    
                  

                    

                
                
                    break;

                case "###":
                    const subheadline2 = document.createElement("h3")
                    subheadline2.innerText = args
                    container.appendChild(subheadline2)
                    break;

                 case "<=":
                    let argsSplit1 = args.split(" ")
                    let argsSplit2 = argsSplit1[0]
                   if (line.includes("(div)")) {
                    container = document.getElementById(argsSplit2)
                   }


                   else if (line.includes("(END)")) {
                    container = document.getElementById("container")
                   }
                    else {
                    const id = document.getElementById(argsSplit2)
                    id.innerText = argsSplit1.slice(1).join(" ")
                    }
                    
                    break;

                case "#":
                    const headline = document.createElement("h1")
                    headline.innerText = args
                    container.appendChild(headline)
                    break;



                case "*LIST":
                    ul = document.createElement("ul")
                    container.appendChild(ul)
                    break;

                case "*":
                    const li = document.createElement("li")
                    li.innerText = args
                    ul.appendChild(li)
                    break;

                case "---":
                    table = document.createElement("table")
                     tRow = document.createElement("tr")
                    container.appendChild(table)
                    inTable = true
                    break;

                

                case "|":
                  let splitter =  args.split(" / ")
                  splitter.forEach(splits => {
                     tHead = document.createElement("th")
                    
                    tHead.innerText = splits
                    table.appendChild(tRow)
                    tRow.appendChild(tHead)
                  })
                   
                   
                    break;



                    case "-":
                        tRow2 = document.createElement("tr")
                    table.appendChild(tRow2)
                   let splitter2 =  args.split(" / ")
                   splitter2.forEach(splits2 => {
                      const tD = document.createElement("td")
                    
                    
                   tD.innerText = splits2
                    tRow2.appendChild(tD)
                   })
                  
                  
                    break;

            }
           
        } 
       
       
         else if (line.startsWith("pic(")) {
            const imag = document.createElement("img")
                    imag.src = line.slice(4, -1)
                    container.appendChild(imag)
        } 

         else if (line.startsWith("vid(")) {
            container.appendChild(document.createElement("br"))
            const ivid = document.createElement("video")
                    ivid.controls = true
            const sources = document.createElement("sources")
            sources.src = line.slice(4, -1)
            sources.type = "video/" + line.slice(-4,-1).toLowerCase()
                    container.appendChild(ivid)
                    ivid.appendChild(sources)
        } 
         else if (line.trim() !== "" || line.includes("(SM)") || line.includes("(BD)") || line.includes("(COLOR-)")) {
                 const para = document.createElement("p")
                  
                    if (line.includes("(SM)")) {
                        para.innerHTML = "<small>" + args + "</small>"
                    }

                    else if (line.includes("(BD)")) {
                        para.innerHTML = "<b>" + args + "</b>"
                        
                    }

                    else if (cmd === "//") {
                   
                        
                    }

                    else if (line.includes("(COLOR-")) {
                        let match = line.match(/\(COLOR-([^)]+)\)/)
                        if (match) {
                            para.style.color = match[1]
                            line = line.replace(match[0], "").trim()
                        }
                        para.innerText = line
                    }

                        else if (line.startsWith("[")) {
                        let match2 = line.slice(1,-1)
                       match2.id = match2
                      
                            container.appendChild(match2)
                    }

                                      else if (line.startsWith("$")) {
                        let match3 = line.slice(1)
                                        if (match3.startsWith("BGCOL=")) {
                                            container.style.backgroundColor = match3.trim().slice(6)
                                        }

                                        if (match3.startsWith("FONT=")) {
                                            container.style.fontFamily = match3.trim().slice(5)
                                        }
                                        if (match3.startsWith("HCSS=")) {
                                            let cssing = document.createElement("style")
                                            cssing.innerHTML = match3.trim().slice(5)
                                            document.body.appendChild(cssing) 
                                        }

                                        if (match3.startsWith("TA=")) {

                                            container.style.textAlign = match3.trim().slice(3)
                                            
                                        }

                                        else {
                                            const parag = document.createElement("p")
                                            parag.innerText = line
                                            container.appendChild(parag)
                                        }
                      
                         
                    }

                      else if (line.startsWith("(CLASS-")) {
                        let match3 = line.match(/\(CLASS-([^)]+)\)/)
                        if (match3) {
                            para.className = match3[1]
                            line = line.replace(match3[0], "").trim()
                        }
                        para.innerText = line
                    }
                    else {
                         para.innerText = line
                    }

                    container.appendChild(para)
                    
        } }
     


)
    
})
.catch(err => console.error(err))

history.replaceState(null, "", "#" + post.slice(44).replace(/\//g, "-"))
}

