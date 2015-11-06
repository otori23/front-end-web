/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
/*
$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());
*/

$(function() {
	
	/* ======= Model ======= */
	var model = {

		init: function() {
			this.attendance = JSON.parse(localStorage.attendance)
		},
		
		update: function(newModel) {
			this.attendance = newModel;
			octopus.modelChanged();
		}
	};

	/* ======= Octopus ======= */
	var octopus = {

		init: function() {
			model.init();
			view.init();
		},
		
		onCheckBoxClick: function() {
			var studentRows = $('tbody .student'),
			newAttendance = {};

			studentRows.each(function() {
				var name = $(this).children('.name-col').text();
				var $allCheckboxes = $(this).children('td').children('input');

				newAttendance[name] = [];

				$allCheckboxes.each(function() {
					newAttendance[name].push($(this).prop('checked'));
				});	
			});
			model.update(newAttendance);
		},

		getAttendance: function() {
			return model.attendance;
		},

		modelChanged: function() {
			view.render();
			localStorage.attendance = JSON.stringify(model.attendance);
		}
	};

	/* ======= View ======= */
	var view = {

		init: function() {
			this.$allMissed = $('tbody .missed-col'),
			this.$allCheckboxes = $('tbody input');

			// When a checkbox is clicked, update localStorage
			this.$allCheckboxes.on('click', function() {
				octopus.onCheckBoxClick();
			});

			this.render();
		},

		render: function() {
			var attendance = octopus.getAttendance();
			$.each(attendance, function(name, days) {
				var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
				dayChecks = $(studentRow).children('.attend-col').children('input');

				dayChecks.each(function(i) {
				$(this).prop('checked', days[i]);

				});
			});

			this.$allMissed.each(function() {
				var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

				dayChecks.each(function() {
					if (!$(this).prop('checked')) {
						numMissed++;
					}
				});

				$(this).text(numMissed);
			});
		}
	};

	// make it go!
	octopus.init();
}());