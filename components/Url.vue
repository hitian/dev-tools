<template>
    <VaCard>
        <VaCardTitle>URL encode</VaCardTitle>
        <VaCardContent>
            <VaTextarea v-model="input" style="width: 100%;" minRows="10" placeholder="input here" autosize />
            <div style="margin-top: 10px;text-align: left;">
                <VaButton @click="decode">
                    decode
                </VaButton>
                <VaButton class="my-ml-10" @click="encode">
                    encode
                </VaButton>
            </div>
            <VaAlert color="danger" v-if="message" :description="message" />
            <VaTextarea v-model="output" :readonly="readonly" placeholder="output" class="my-mt-10"
                style="width: 100%;margin-top: 10px;" minRows="10" autosize />
        </VaCardContent>


    </VaCard>
</template>

<script>
export default {
    data() {
        return {
            message: "",
            input: "",
            output: "",
        }
    },
    methods: {
        encode() {
            if (this.input.length == "") {
                this.showMessage("input empty");
            }
            let result = encodeURIComponent(this.input);
            if (result.length > 0) {
                this.output = result;
            } else {
                this.showMessage("encode failed.");
            }
        },
        decode() {
            if (this.input.length == "") {
                this.showMessage("input empty");
            }
            let result = decodeURIComponent(this.input);
            if (result.length > 0) {
                this.output = result;
            } else {
                this.showMessage("decode failed.");
            }
        },
        showMessage(message) {
            this.message = message;
            setTimeout(() => {
                this.message = "";
            }, 5000);
        }
    }
}

</script>

<style>
.my-ml-10 {
    margin-left: 10px;
}

.my-mt-10 {
    margin-top: 10px;
}
</style>