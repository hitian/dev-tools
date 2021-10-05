<template>
    <div>
        <div class="alert alert-info clearfix">
            <label class="col-form-label">TimeZone: {{current_timezone}}</label>
            <div class="input-group float-right" style="width: 240px">
                <vue-bootstrap-typeahead 
                    v-model="selected_timezone"
                    :data="timezoneNameList"
                    placeholder="type to search"
                    @hit="selectedTimezone"
                    :maxMatches="maxMatches"
                    style="width: 150px"
                />
                <div class="input-group-append">
                    <button class="btn btn-warning" @click="selectedTimezone" type="button">Change</button>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <div class="card-title">
                    Now
                </div>
                <div class="row">
                    <div class="input-group ml-3" style="width: 280px">
                        <div class="input-group-prepend">
                            <span class="input-group-text" style="background-color: #FFDC00;">Unix Timestamp</span>
                        </div>
                        <input type="text" class="form-control" v-model="now" readonly onClick="this.select();" />
                    </div>
                    <div class="input-group ml-3" style="width: 280px">
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
                <b-input-group class="mt-3" style="width: 320px">
                    <b-form-input 
                        v-model="timestamp_value" 
                        @keyup.enter="timestampConvert" 
                        type="text" 
                        placeholder="timestamp"></b-form-input>
                    <b-input-group-append>
                        <b-button @click="timestampConvert" variant="success">Convert</b-button>
                        <b-button @click="timeStringListClean" variant="warning">Clean</b-button>
                    </b-input-group-append>
                </b-input-group>
                <div class="mt-2" v-if="time_string_list">
                    <span v-for="(item, index) in time_string_list" :key="index" class="badge badge-success ml-1">
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
                        <li> Timestamp(seconds): {{Stimestamp}}</li>
                        <li> Timestamp(milliseconds): {{StimestampMilliseconds}}</li>
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
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

export default {
    components: {
        VueBootstrapTypeahead
    },
    data() {
        return {
            now: moment().unix(),
            now_datetime: "",
            timestamp_value: "",
            time_string_list: [],
            time_string: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),

            current_timezone: "",
            selected_timezone: "",
            search_timezone_input: "",
            maxMatches: 1000,
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
            return moment.tz(this.time_string, this.current_timezone);
        },
        Stimestamp() {
            let time = this.theTime;
            return time.isValid() ? time.unix() : "-";
        },
        StimestampMilliseconds() {
            let time = this.theTime;
            return time.isValid() ? time.valueOf() : "-";
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
    mounted(){
        // document.getElementById("timezone-input").typeahead({source: this.timezoneNameList})
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
