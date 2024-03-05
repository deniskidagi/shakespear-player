/* In this module, create three classes: Play, Act, and Scene. */

class Play{
    constructor(data){
        this.data = data;
    }
    getActs(){
        return this.data.acts;
    }
}
class Act{
    constructor(data){
        this.data = data;
    }
    getScenes(){
        return this.data.scenes;
    }

}
class Scene{
    constructor(data){
        this.data = data;
    }
    getSpeeches(){
        return this.data.speeches;
    }

}
export {Play, Scene, Act};