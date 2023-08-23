import Canvas from "./canvas";
import DragManager from "./draglistener";

export interface TimeTableItem{
    title: string,  color: string, start: string, end: string
}

export interface TimeTableConfig{
    showDate?: boolean;
    columnCount?: number;
    rowCount?: number;
    cellWidth?:number;
    cellHeight?: number;
    timeHeaderHeight? :  number;
    presentDayCOlor?: string;
    hoverColor?: string;

    outlineThickness?: number;
    outlineColor?:string;

    lineThickness?: number;
    lineColor?:string;

    timeFontSize?: number;
    timeFontColor?: string;
    timeFontFamily?: string;

    dateFontSize?: number;
    dateFontColor?:  string;
    dateFontFamily?: string;
}

export default class TimeTable{
    canvas: Canvas;
    initDate: Date;
    scrollValue: number;
    config: TimeTableConfig;

    constructor(context: CanvasRenderingContext2D, showDate: boolean = false, initDate: Date = new Date()){
        this.canvas = new Canvas(context);
        this.initDate = initDate;
        this.scrollValue = 0;
        context.canvas.style.cursor = "pointer";

        const cellWidth = this.canvas.context.canvas.offsetWidth / 12;
        const cellHeight = (this.canvas.context.canvas.offsetHeight - 30) / 7;

        this.config = {
            showDate, columnCount: 12, rowCount: 7, cellWidth, cellHeight, timeHeaderHeight: 30, lineThickness: 1, lineColor: "grey",
            outlineColor: "grey", outlineThickness: 1, timeFontColor:"grey", timeFontSize:12, timeFontFamily:"mono", dateFontSize: 15,
            dateFontColor: "grey", dateFontFamily: "'Merriweather', serif", presentDayCOlor: "#f3f3f3", hoverColor: "grey"
        }

        const dragManager = new DragManager(context.canvas);
        dragManager.setDragListener((dragX) =>{
            this.scrollValue += dragX;

            this.clear();
            this.show();
        });

        dragManager.setHoverListener((hover, hoverX, hoverY)=>{
            this.clear();
            if(hover){
                let x = hoverX - this.config.cellWidth!;
                let y = hoverY - this.config.timeHeaderHeight!;
                if(x > 0 && y > 0){
                    let xindex = x - (x % this.config.cellWidth!) + this.config.cellWidth!;
                    let yindex = y - (y % this.config.cellHeight!) + this.config.timeHeaderHeight!;

                    let analogX = x - this.config.cellWidth!;

                    let width = this.config.cellWidth!;
                    //if(){
                        //console.log("x-position:" + x);
                        if(analogX < (this.scrollValue % this.config.cellWidth!) && this.scrollValue > 0){
                            width = (this.scrollValue % this.config.cellWidth!);
                        }else if(analogX < -1 * (this.scrollValue % this.config.cellWidth!)){
                            width = this.config.cellWidth! + (this.scrollValue % this.config.cellWidth!);
                        //}
                    }else{
                        if( this.scrollValue > 0){
                            xindex -= this.config.cellWidth! - (this.scrollValue % this.config.cellWidth!);
                        }else{
                            xindex += (this.scrollValue % this.config.cellWidth!);
                        }
                    }
                    this.canvas.drawRectangle({x: xindex, y: yindex, width, height: this.config.cellHeight!, fill:true, color: this.config.hoverColor });
                }
            }
            this.show();
        });
    }

    width = () => this.canvas.context.canvas.offsetWidth;
    height = () => this.canvas.context.canvas.offsetHeight;
    configure = (config: TimeTableConfig) => this.config = {...config};

    private drawOutline(){
        this.canvas.drawRectangle({
            x: 0, y: 0,
            width: this.config.cellWidth! * this.config.columnCount!,
            height: this.config.cellHeight! * this.config.rowCount! + this.config.timeHeaderHeight!,
            color: this.config.outlineColor, thickness: this.config.outlineThickness
        });
    }

    private drawHorizontalLines(){
        for(let i = 0; i < this.config.rowCount!; i++){
            let width = this.config.cellWidth! * this.config.columnCount!;
            let y = i * this.config.cellHeight! + this.config.timeHeaderHeight!;
            this.canvas.drawLine({ x: 0, y, length: width, thickness: this.config.lineThickness, color: this.config.lineColor});``
        }
    }

    private insertDays(index: number){
        const days = ["SUN","MON", "TUE", "WED", "THU", "FRI", "SAT"];
        let sunday = new Date(this.initDate.valueOf() - (this.initDate.getDay() * 1000 * 60 * 60 * 24) + (index * 1000 * 60 * 60 * 24 * 7));
        for(let i = 0; i < days.length; i++){
            let yStart = i * this.config.cellHeight! + this.config.timeHeaderHeight!;

            let init = new Date(sunday.valueOf() + ( i * 1000 * 60 * 60 * 24 )).getDate().toString();

            let suffix = "th";
            switch(init.charAt(init.length - 1)){
                case '1':
                    suffix = "st";
                    break;
                case '2':
                    suffix = "nd";
                    break;
                case '3':
                    suffix = "rd";
                    break;
            }

            let day = days[i] + `( ${init}${suffix})`;

            this.canvas.writeText({ message: day, x: 0, y: yStart, width: this.config.cellWidth!, height: this.config.cellHeight!, color: this.config.dateFontColor, fontSize: this.config.dateFontSize, fontFamily: this.config.dateFontFamily });
        }
        this.canvas.drawLine({x: this.config.cellWidth!, y: this.config.timeHeaderHeight!, length: this.config.cellHeight! * this.config.rowCount!, orientation: "vertical", color: this.config.lineColor, thickness: this.config.lineThickness});
    }

    drawTimeLines(scroll: number = 0){
        const current = new Date();

        let initPosition = this.config.cellWidth! + (scroll % this.config.cellWidth!);
        const firstIndex = scroll >= 0 ? -Math.floor(scroll / this.config.cellWidth!) : (-Math.floor(scroll / this.config.cellWidth!) - 1);
        let index = firstIndex;
        while(initPosition < this.width()){
            let height = this.config.cellHeight! * this.config.rowCount!;
            const initTime = new Date(current.valueOf() + index * 1000 * 60 * 60);

            if(initTime.getDate() === current.getDate() && initTime.getMonth() === current.getMonth()){
                let done = false;
                let presentY = this.config.timeHeaderHeight! + current.getDay() * this.config.cellHeight!;
                if(index === firstIndex && initTime.getHours() > 0){
                    if(scroll > 0){
                        this.canvas.drawRectangle({x: this.config.cellWidth!, y: presentY, width: (this.config.cellWidth! + initPosition), height: this.config.cellHeight!, fill: true, color: this.config.presentDayCOlor });
                    }else{
                        let remainder = this.config.cellWidth! - (this.config.cellWidth! - initPosition);
                        this.canvas.drawRectangle({x: this.config.cellWidth!, y: presentY, width: remainder, height: this.config.cellHeight!, fill: true, color: this.config.presentDayCOlor });
                        done = true;
                    }
                }
                if(!done){
                    this.canvas.drawRectangle({x: initPosition, y: presentY, width: this.config.cellWidth!, height: this.config.cellHeight!, fill:true, color: this.config.presentDayCOlor });
                }
            }

            let time = `${initTime.getHours()}:00`;
            if(initPosition >= this.config.cellWidth! && initPosition < this.width()){
                this.canvas.drawLine({ x: initPosition , y: this.config.timeHeaderHeight!, length: height, color: this.config.lineColor, thickness: this.config.lineThickness, orientation:"vertical", text:{message: time, margin: 6, color: this.config.timeFontColor, fontSize: this.config.timeFontSize, fontFamily: this.config.timeFontFamily } });
            }

            initPosition += this.config.cellWidth!;
            index += 1;
        }
        this.insertDays(Math.floor((firstIndex < 0 ? (firstIndex +  current.getHours() - 1) : (firstIndex + current.getHours())) / 24));
    }

    show = () =>{
        this.drawTimeLines(this.scrollValue);
        this.drawHorizontalLines();
        this.drawOutline();
    }

    reset = () => {
        this.scrollValue = 0;
        this.clear();
        this.show();
    };

    showItems(scroll: number, items: TimeTableItem[]){

    }

    clear = () => this.canvas.clear();
}