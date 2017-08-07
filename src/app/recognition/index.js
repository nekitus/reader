// захват

// rgba(0,0,0,255) // black

//TODO: в перспективе можно находить среднюю меджу rgb а пока взять первую цифру(все равно только черный)
// rgba(255,255,255,255) // white

// 2500 px size

export default class Recognition {
    constructor(...props){
        const [weights, imageData] = props;
        this.props = {weights, imageData};
    }

    static getLearnWeights(weights, imageData, symbol) {
        const storeWeight = weights && weights !== "0" && weights.find((weight) => {
            return weight.name === symbol
        });

        const weight = storeWeight && storeWeight.data || [];

        if(weight.length) {
            updateWeights(imageData, weight, (value, i) => {
                if(value) {
                    const w = Number(weight[i]);
                    if(w < 4) {
                        weight[i] = w + value;
                    }
                }
            })
        } else {
            updateWeights(imageData, weight, (value) => {
                weight.push(value)
            })
        }

        function updateWeights(imageData, weight, fnc){
            for(let i = 0, j = 0; i < imageData.data.length; i+=4, j++) {
                const r = imageData.data[i];
                if (r < 127) {
                    fnc(1, j);
                } else {
                    fnc(0, j);
                }
            }
        }

        return weight;
    }

    recognize() {
        const {weights, imageData} = this.props;
        const data = imageData.data;

        const results = [];
        if(weights === "0") {
            return results
        }
        weights.forEach((weight) => {
            let net = 0;
            for(let i = 0, j = 0; i < data.length; i+=4, j++) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const reverseColor = 255 - 1 * r;
                const compressValue = reverseColor > 112 ? 1 : 0; // reverseColor / 112;  // Сжимаем значение цвета чтобы не работать с большими цифрами при подсчетах
                net += compressValue * weight.data[j];
            }
            // порог
            const limit = 600;
            // двигаем порог от ноля до приемлемго значения
            const NET = net - limit;

            const out = 1 / (1 + Math.pow(4, -(NET / 100)));
            const result = out > 0.5;
            if(result) {
                results.push({name: weight.name, result: out})
            }
        });

        results.sort((a, b) => a.result < b.result);
        return results;
    }
}

export function imageCapture(ctx, pathOrigin){
    const path = [...pathOrigin];
    const sortedX = path.sort((a, b) => a.x - b.x);
    const minX = sortedX[0].x;
    const maxX = sortedX[path.length - 1].x;

    const sortedY = path.sort((a, b) => a.y - b.y);
    const minY = sortedY[0].y;
    const maxY = sortedY[path.length - 1].y;

    const width = maxX - minX;
    const height = maxY - minY;

    const padding = 300 / height;


    return  ctx.getImageData(minX - padding,minY - padding,width + padding * 2,height + padding * 2);
}