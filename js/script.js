(function ($) {
    $(document).ready(function () {

        function coffeeMachine(cmPower, cmCapacity, cmObj) {

            var cmWaterCur = 0,
                cmTimer,
                cmStatus = false;

            cmObj.find('#cm-power').val(cmPower);
            cmObj.find('#cm-capacity').val(cmCapacity);
            cmObj.find('#cm-water-cur').val(cmWaterCur);
            cmObj.find('#cm-status').val('OFF');
            cmObj.find('#cm-stop').attr('disabled', 'disabled');

            function cmBoilCalc() {
                return cmWaterCur * 4200 * 80 / cmPower;
            }

            function cmReady() {
                cmStatus = false;
                cmObj.find('#cm-status').val('Кофе готов!');
                cmObj.find('#cm-run').removeAttr('disabled');
                cmObj.find('#cm-stop').attr('disabled', 'disabled');
            }

            function run() {
                if (!cmStatus && cmWaterCur > 0) {
                    cmTimer = setTimeout(cmReady, cmBoilCalc());
                    cmStatus = true;
                    cmObj.find('#cm-status').val('Кофе готовится!');
                    cmObj.find('#cm-run').attr('disabled', 'disabled');
                    cmObj.find('#cm-stop').removeAttr('disabled');
                } else if (cmWaterCur == 0) {
                    cmObj.find('#cm-status').val('Залейте воду!');
                }
            }

            function stop() {
                if (cmStatus) {
                    clearTimeout(cmTimer);
                    cmStatus = false;
                    cmObj.find('#cm-status').val('Приготовление кофе отменено!');
                    cmObj.find('#cm-run').removeAttr('disabled');
                    cmObj.find('#cm-stop').attr('disabled', 'disabled');
                }
            }

            function addWater() {
                var water = cmObj.find('#cm-water-cur-add').val();
                if (+water >= 0 && +water <= cmCapacity) {
                    cmWaterCur = +water;
                    cmObj.find('#cm-water-cur').val(cmWaterCur);
                } else {
                    cmObj.find('#cm-status').val('Некорректный объем воды!');
                }
            }

            cmObj.find('#cm-run').click(run);
            cmObj.find('#cm-stop').click(stop);
            cmObj.find('#cm-add-water').click(addWater);
        }

        var cm1 = new coffeeMachine(100000, 2000, $('.cm1'));

    });
})(jQuery);
