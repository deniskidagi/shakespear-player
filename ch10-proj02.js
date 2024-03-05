//import { Play, Act, Scene } from "./play-module";


document.addEventListener("DOMContentLoaded", function() {

	
	//const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
   const playlist = document.querySelector("#playList");

   let actslist = document.querySelector("#actList");
   let sceneList = document.querySelector("#sceneList");
   let players = document.querySelector("#playerList");

   //filter button
   const searchButton= document.querySelector("#btnHighlight");
   const searchInput  = document.querySelector("#txtHighlight");




   playlist.addEventListener("change", function(e){
     const hamlet =  "https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet";
     const caesar = "https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar";

      const data = e.target.value == "hamlet" ? fetch(hamlet) : fetch(caesar);
      data
      .then(response => response.json())
      .then(data => {
         console.log(data);
  
      const acts = data["acts"];
 
      //display acts
      function renderActs(){
         actslist.innerHTML = "";
         acts.forEach(data => {
            let name = data.name;
            let option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            actslist.appendChild(option); 
         })
      }
      renderActs()
      
      //display scenes
      function renderScenes(){
         sceneList.innerHTML = "";
         const currentActs = acts.find(act => act.name == actslist.value)
         const scenes = currentActs.scenes;
         //const current_scene = scenes.find(scene => scene.name == sceneList.value)
         scenes.forEach(scene => {
            let option = document.createElement("option");
            option.value = scene.name;
            option.textContent = scene.name;
            sceneList.appendChild(option);
         })
      }
      renderScenes()
       
      //display speakers
      function renderSpeakers(){
         const currentActs = acts.find(act => act.name == actslist.value)
         const scenes = currentActs.scenes;
         const current_scene = scenes.find(scene => scene.name == sceneList.value)
         const speeches = current_scene.speeches;
         players.innerHTML = "";
         speeches.forEach(speaker => {
            let option = document.createElement("option");
            option.value = speaker.speaker;
            option.textContent = speaker.speaker;
            players.appendChild(option);
         })
      }
      renderSpeakers()

      function filterSpeech(){
         searchButton.addEventListener("click", function() {
            // Get the search term from the input field
            const searchTerm = searchInput.value.toLowerCase();
         
            // Get all paragraph elements
            const paragraphs = document.querySelectorAll("p");
         
            paragraphs.forEach(paragraph => {
            // Remove previous highlights (if any)
            paragraph.innerHTML = paragraph.textContent;
            //console.log(paragraph.textContent);
         
            // Check if the search term exists in the paragraph text (case-insensitive)
            if (paragraph.textContent.toLowerCase().includes(searchTerm)) {
               // Wrap the matched search term in a span element with yellow background
                paragraph.innerHTML =  paragraph.textContent.replace(
                  new RegExp(searchTerm, "gi"), // "gi" for global case-insensitive search
                  `<span style="background-color: yellow; width: 30px;display: inline;">$&</span>`
               );
            }
            });
         });
      }

    play()
   function play(){
      let container = document.querySelector("#playHere");
      container.innerHTML = "";
      let play_title = document.createElement("h2");
      play_title.textContent = data.title;
      container.appendChild(play_title);
      let article = document.createElement("article");
      article.setAttribute("id", "actHere");
      container.appendChild(article);
      let act_name = document.createElement("h3");
      act_name.textContent = actslist.value;
      let sceneDiv = document.createElement("div");
      sceneDiv.setAttribute("id", "sceneHere");
      article.appendChild(act_name);
      article.appendChild(sceneDiv);
      let scene_name = document.createElement("h4");
      scene_name.textContent = sceneList.value
      let player_title = document.createElement("p");
      player_title.classList.add("title");
      let stage_direction = document.createElement("p");
      stage_direction.classList.add("direction");
      sceneDiv.appendChild(act_name)
      sceneDiv.appendChild(scene_name)
      sceneDiv.appendChild(player_title);
      sceneDiv.appendChild(stage_direction);

      let playdata = acts.find(r => r.name == actslist.value);
      let scenes = playdata.scenes;
      let current_scene = scenes.find(scene => scene.name == sceneList.value);
      player_title.textContent = current_scene.title;
      stage_direction.textContent =current_scene.stageDirection;
      let speeches = current_scene.speeches;
      renderSpeakers()
      speeches.forEach(speech => {
         let div = document.createElement("div");
         div.classList.add("speech");
         let span = document.createElement("span");
         span.textContent = speech.speaker;
         div.appendChild(span)
         let lines = speech.lines;
         for(let line of lines){
            let p = document.createElement("p");
            p.textContent = line;
           
            div.appendChild(p)
         }
         article.appendChild(div);
      })
    
      actslist.onchange = function(e){
         article.innerHTML = "";
         let act_name = document.createElement("h3");
         let sceneDiv = document.createElement("div");
         sceneDiv.setAttribute("id", "sceneHere");
         article.appendChild(act_name);
         article.appendChild(sceneDiv);
         let scene_name = document.createElement("h4");
         
         let player_title = document.createElement("p");
         player_title.classList.add("title");
         let stage_direction = document.createElement("p");
         stage_direction.classList.add("direction");
         sceneDiv.appendChild(act_name)
         sceneDiv.appendChild(scene_name)
         sceneDiv.appendChild(player_title);
         sceneDiv.appendChild(stage_direction);

         let filteredContent = acts.find(act => act.name == e.target.value);  
         act_name.textContent = filteredContent.name;
         const scenes = filteredContent.scenes;
         let filteredScene = scenes.find(scene => scene.name == sceneList.value);
         player_title.textContent = filteredScene.title
         scene_name.textContent = filteredScene.name;
         stage_direction.textContent = filteredScene.stageDirection
         let speeches = filteredScene.speeches
         renderScenes();
         renderSpeakers();
         speeches.forEach(speech => {
            let div = document.createElement("div");
         
            div.classList.add("speech");
            let span = document.createElement("span");
            span.textContent = speech.speaker;
            div.appendChild(span)
            let lines = speech.lines;
            for(let line of lines){
               let p = document.createElement("p");
               p.textContent = line;
               div.appendChild(p)
            }
            article.appendChild(div);
         })
         renderSpeakers()

      }

      sceneList.onchange = function(e){
         article.innerHTML = "";
         let act_name = document.createElement("h3");
         let sceneDiv = document.createElement("div");
         sceneDiv.setAttribute("id", "sceneHere");
         article.appendChild(act_name);
         article.appendChild(sceneDiv);
         let scene_name = document.createElement("h4");
         
         let player_title = document.createElement("p");
         player_title.classList.add("title");
         let stage_direction = document.createElement("p");
         stage_direction.classList.add("direction");
         sceneDiv.appendChild(act_name)
         sceneDiv.appendChild(scene_name)
         sceneDiv.appendChild(player_title);
         sceneDiv.appendChild(stage_direction);

         let filteredContent = acts.find(act => act.name == actslist.value);  
         act_name.textContent = filteredContent.name;
         const scenes = filteredContent.scenes;
         let filteredScene = scenes.find(scene => scene.name == e.target.value);
         player_title.textContent = filteredScene.title
         scene_name.textContent = filteredScene.name;
         stage_direction.textContent = filteredScene.stageDirection
         let speeches = filteredScene.speeches
         renderSpeakers()
         speeches.forEach(speech => {
            let div = document.createElement("div");
            div.classList.add("speech");
            let span = document.createElement("span");
            span.textContent = speech.speaker;
            div.appendChild(span)
            let lines = speech.lines;
            for(let line of lines){
               let p = document.createElement("p");
               p.textContent = line;
               div.appendChild(p)
            }
            article.appendChild(div);
         })

    
      }
      players.onchange = function(e){
         article.innerHTML = "";
         let act_name = document.createElement("h3");
         let sceneDiv = document.createElement("div");
         sceneDiv.setAttribute("id", "sceneHere");
         article.appendChild(act_name);
         article.appendChild(sceneDiv);
         let scene_name = document.createElement("h4");
         
         let player_title = document.createElement("p");
         player_title.classList.add("title");
         let stage_direction = document.createElement("p");
         stage_direction.classList.add("direction");
         sceneDiv.appendChild(act_name)
         sceneDiv.appendChild(scene_name)
         sceneDiv.appendChild(player_title);
         sceneDiv.appendChild(stage_direction);

         let filteredContent = acts.find(act => act.name == actslist.value);  
         act_name.textContent = filteredContent.name;
         const scenes = filteredContent.scenes;
         let filteredScene = scenes.find(scene => scene.name == sceneList.value);
         player_title.textContent = filteredScene.title
         scene_name.textContent = filteredScene.name;
         stage_direction.textContent = filteredScene.stageDirection
         let speeches = filteredScene.speeches
         speeches.forEach(speech => {
            let div = document.createElement("div");
            div.classList.add("speech");
            let span = document.createElement("span");
            const speaker = e.target.value;
            if(speech.speaker == speaker){
               span.textContent = speech.speaker;
               div.appendChild(span)
               let lines = speech.lines;
               for(let line of lines){
                  let p = document.createElement("p");
                  p.textContent = line;
                  div.appendChild(p)
               }
            }
            article.appendChild(div);
           
         })
     
      }
filterSpeech();
   }
   })
 

})


   //populate actlist





   /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
	 
   
    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */
});