<template>
    <div>
        <div class="alert alert-info clearfix">
            <label class="col-form-label">TimeZone: {{current_timezone}}</label>
            <div class="input-group col-md-5 float-right">
                <input class="form-control" type="text" v-model="search_timezone_input" placeholder="search">
                <select id="timezone-select" @change="selectedTimezone" v-model="selected_timezone" class="form-control">
                    <option v-for="(timezone, index) in timezoneNameList" :key="index">{{timezone}}</option>
                </select>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <div class="card-title">
                    Now
                </div>
                <div class="row">
                    <div class="input-group col">
                        <div class="input-group-prepend">
                            <span class="input-group-text" style="background-color: #FFDC00;">Unix Timestamp</span>
                        </div>
                        <input type="text" class="form-control" v-model="now" readonly onClick="this.select();" />
                    </div>
                    <div class="input-group col">
                        <div class="input-group-prepend">
                            <span class="input-group-text" style="background-color: #7FDBFF;">Datetime</span>
                        </div>
                        <input type="text" class="form-control" v-model="now_datetime" readonly onClick="this.select();" />
                    </div>
                </div>
                
                
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <div class="card-title">
                    timestamp to time
                </div>
                <div class="form-inline">
                    <div class="form-group mx-sm-3">
                        <input v-model="timestamp_value" @keyup.enter="timestampConvert" type="text" placeholder="timestamp" class="form-control" />
                    </div>
                    <div class="form-group">
                        <button @click="timestampConvert" class="form-control btn btn-primary">Convert</button>
                    </div>
                    <div class="form-group mx-sm-3">
                        <button @click="timeStringListClean" class="form-control btn btn-warning">Clean</button>
                    </div>
                </div>
                <div class="mt-2">
                    <span v-if="time_string_list" v-for="(item, index) in time_string_list" :key="index" class="badge badge-success ml-1">
                        {{ item }}
                    </span>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <div class="card-title">
                    time info
                </div>
                <div class="form-inline">
                    <div class="form-group mx-sm-3">
                        <input v-model="time_string" type="text" placeholder="datetime string" class="form-control" />
                    </div>
                </div>
                <div class="mt-2">
                    <ul>
                        <li> isValid: {{isValid}} </li>
                        <li> Timestamp: {{Stimestamp}}</li>
                        <li> Day of Year: {{Sdayofyear}}</li>
                        <li> Week of Year: {{Sweekofyear}}</li>
                        <li> TimeZone: {{Stimezone}}</li>
                    </ul>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var moment = require('moment-timezone');
const time_format_string = "YYYY-MM-DD HH:mm:ss ZZ";
const localStorage = window.localStorage;

export default {
    data() {
        return {
            now: moment().unix(),
            now_datetime: "",
            timestamp_value: "",
            time_string_list: [],
            time_string: moment().format("YYYY-MM-DD HH:mm:ss"),

            current_timezone: "",
            selected_timezone: "",
            search_timezone_input: "",
        }
    },
    head () {
        return {
            title: "time & timestamp convert",
            meta: [
                { hid: 'description', name: 'description', content: 'time & timestamp convert, timezone' }
            ]
        }
    },
    computed: {
        nowffda() {
            return moment().unix();
        },
        isValid() {
            return moment(this.time_string).isValid() ? "Yes" : "No";
        },
        theTime() {
            return moment.tz(moment(this.time_string), this.current_timezone);
        },
        Stimestamp() {
            let time = this.theTime;
            return time.isValid() ? time.unix() : "-";
        },
        Sdayofyear() {
            let time = this.theTime;
            return time.isValid() ? time.format("DDDD") : "-";
        },
        Sweekofyear() {
            let time = this.theTime;
            return time.isValid() ? time.format("w") : "-";
        },
        Stimezone() {
            let time = this.theTime;
            return time.isValid() ? time.format("ZZ") : "-";
        },

        timezoneNameList() {
            return moment.tz.names().filter(zoneName => zoneName.toUpperCase().indexOf(this.search_timezone_input.toUpperCase()) != -1);
        }
    },
    created() {
        if (this.current_timezone == "") {
            if (!localStorage.timezone) {
                localStorage.timezone = moment.tz.guess();
            }
            this.current_timezone = localStorage.timezone;
        }
        this.refreshNow();
    },
    methods: {
        timestampConvert() {
            let time = moment(this.timestamp_value * 1000).tz(this.current_timezone).format(time_format_string)
            let list = this.time_string_list;
            list.unshift(time);
            this.time_format_string = list;
        },
        timeStringListClean() {
            this.time_string_list = [];
        },
        refreshNow() {
            this.now = moment().unix();
            this.now_datetime = moment().tz(this.current_timezone).format("YYYY-MM-DD HH:mm:ss");
        },
        selectedTimezone() {
            if (!confirm("change timezone to " + this.selected_timezone + "?")) {
                return;
            }
            this.current_timezone = this.selected_timezone;
            localStorage.timezone = this.selected_timezone;

            this.refreshNow();
        }
    }
}
</script>
