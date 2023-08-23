export interface RectangleOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    fill?: boolean;
    borderRadius?: number;
    color?: string;
    thickness?: number;
    text?:{ message: string, color?: string, fontSize?: number, fontFamily?: string, valign?:  "top" | "center" | "bottom", halign?: "right" | "center" | "left", margin?: number }
}

export interface LineOptions {
    x: number;
    y: number;
    length: number;
    color?: string;
    thickness?: number;
    orientation?: 'horizontal' | 'vertical';
    text?:{ message: string, color?: string, fontSize?: number, fontFamily?: string, position?:  "start" | "end", margin?: number }
}

export interface TextBoundaryOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    message: string, 
    color?: string, 
    fontSize?: number, 
    fontFamily?: string,
    thickness?: number;
    valign?:  "top" | "center" | "bottom",
    halign?: "right" | "center" | "left",
    margin?: number
}

export default class Canvas {
    context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D){
        this.context = context;
        this.context.canvas.width = context.canvas.offsetWidth;
        this.context.canvas.height = context.canvas.offsetHeight;
    }

    clear() {
        this.context.clearRect(0, 0, this.context.canvas.offsetWidth, this.context.canvas.offsetHeight);
    }

    drawRectangle(options: RectangleOptions): void {
        const { x, y, width, height, fill, borderRadius, text, thickness } = options;
        let color = options.color || "grey";
        this.context.lineWidth = thickness || 1;
      
        this.context.beginPath();
        if (borderRadius) {
            this.context.moveTo(x + borderRadius, y);
            this.context.lineTo(x + width - borderRadius, y);
            this.context.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
            this.context.lineTo(x + width, y + height - borderRadius);
            this.context.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
            this.context.lineTo(x + borderRadius, y + height);
            this.context.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
            this.context.lineTo(x, y + borderRadius);
            this.context.quadraticCurveTo(x, y, x + borderRadius, y);
        } else {
            this.context.rect(x, y, width, height);
        }
        this.context.closePath();
      
        if (fill) {
            this.context.fillStyle = color;
            this.context.fill();
        }else{
            this.context.strokeStyle = color;
            this.context.stroke();
        }

        if(text){
            const { message } = text;
            let color = text.color || "grey";
            let fontSize = text.fontSize || 14;
            let fontFamily = text.fontFamily || "mono";
            let valign = text.valign || "center";
            let halign = text.halign || "center";
            let margin = text.margin || 0;

            this.context.fillStyle = color;
            this.context.font = `${fontSize}px ${fontFamily}`;

            let matrices = this.context.measureText(text.message);
            
            const textWidth = matrices.width;
            let textPositionX = x + margin;
            switch(halign){
                case "center":
                    let middle = x + width / 2;
                    textPositionX = middle - textWidth / 2;
                    break;
                case "right":
                    textPositionX = x + width - margin - textWidth;
                    break;
            }

            const textHeight = matrices.actualBoundingBoxAscent + matrices.actualBoundingBoxDescent;
            let textPositionY = y + margin;
            switch(valign){
                case "center":
                    let middle = y + height / 2;
                    textPositionY = middle - textHeight / 2;
                    break;
                case "bottom":
                    textPositionY = y + height - margin - textHeight;
                    break;
            }

            this.context.fillText(message, textPositionX, textPositionY);
        }
    }

    writeText(options: TextBoundaryOptions): void {
        const { x, y, width, height, message, thickness} = options;
        let color = options.color || "grey";
        let fontSize = options.fontSize || 14;
        let fontFamily = options.fontFamily || "mono";
        let valign = options.valign || "center";
        let halign = options.halign || "center";
        let margin = options.margin || 0;
        this.context.lineWidth = thickness || 1;
        
        this.context.fillStyle = color;
        this.context.font = `${fontSize}px ${fontFamily}`;

        let matrices = this.context.measureText(message);
        
        const textWidth = matrices.width;
        let textPositionX = x + margin;
        switch(halign){
            case "center":
                let middle = x + width / 2;
                textPositionX = middle;
                break;
            case "right":
                textPositionX = x + width - margin - textWidth;
                break;
        }

        const textHeight = matrices.actualBoundingBoxAscent + matrices.actualBoundingBoxDescent;
        let textPositionY = y + margin;
        switch(valign){
            case "center":
                let middle = y + height / 2;
                textPositionY = middle + textHeight / 2;
                break;
            case "bottom":
                textPositionY = y + height - margin - textHeight;
                break;
        }

        this.context.fillText(message, textPositionX, textPositionY);
    }

    drawLine(options: LineOptions): void {
        const { x, y, length, thickness, color, text} = options;
        let orientation = options.orientation || "horizontal";
      
        this.context.beginPath();
        this.context.strokeStyle = color || "grey";
        this.context.lineWidth = thickness || 1;
      
        if (orientation === 'horizontal') {
          const x2 = x + length;
          this.context.moveTo(x, y);
          this.context.lineTo(x2, y);
        } else if (orientation === 'vertical') {
          const y2 = y + length;
          this.context.moveTo(x, y);
          this.context.lineTo(x, y2);
        }
        this.context.stroke();

        if(text){
            let {message, color } = text;
            let fontSize = text.fontSize || 14;
            let fontFamily = text.fontFamily || "mono";
            let position = text.position || "start";
            let margin = text.margin || 0;

            this.context.fillStyle = color || "grey";

            this.context.font = `${fontSize}px ${fontFamily}`;
            this.context.textAlign = "center";

            let matrices = this.context.measureText(message);
            const textWidth = matrices.width;
            const textHeight = matrices.actualBoundingBoxAscent + matrices.actualBoundingBoxDescent;
            if(orientation === "horizontal"){
                let textPositionX = x - margin - textWidth;
                let textPositionY = y - textHeight / 2;
                switch(position){
                    case "end":
                        textPositionX = x + length + margin;
                        break;    
                }
                this.context.fillText(message, textPositionX, textPositionY);
            }else{
                let textPositionX = x;
                let textPositionY = y - margin;
                switch(position){
                    case "end":
                        textPositionY = y + length + margin + textHeight;
                        break;
                }
                this.context.fillText(message, textPositionX, textPositionY);
            }
        }
    }
}