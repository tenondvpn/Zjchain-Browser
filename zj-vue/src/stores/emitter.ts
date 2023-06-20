import mitt from 'mitt';


type Events = {
    foo: string;
    bar: number;
};

const emitter = mitt<Events>();
export default emitter;
