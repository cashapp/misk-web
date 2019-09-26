export declare const stateWithData: {
    simpleRedux: {
        success: boolean;
        "LoadData::dataMaxRows": {
            data: number;
            error: any;
            loading: boolean;
            success: boolean;
            tag: string;
        };
        "LoadData::dataKey": {
            data: string;
            error: any;
            loading: boolean;
            success: boolean;
            tag: string;
        };
        simpleTag: string;
        error: any;
        data: any[];
        "LoadData::dataRequest": {
            error: any;
            loading: boolean;
            success: boolean;
            tag: string;
            url: string;
            data: {
                data: {
                    cars: ({
                        id: string;
                        make: string;
                        model: string;
                        model_year: number;
                        quantity: number;
                        price: string;
                        slogan: string;
                        latitude: number;
                        longitude: number;
                        manufactured_date: string;
                        created_at: string;
                        updated_at: string;
                    } | {
                        id: string;
                        make: string;
                        model: string;
                        model_year: number;
                        quantity: number;
                        price: string;
                        slogan: string;
                        latitude: string;
                        longitude: string;
                        manufactured_date: string;
                        created_at: string;
                        updated_at: string;
                    })[];
                };
            };
        };
    };
};
