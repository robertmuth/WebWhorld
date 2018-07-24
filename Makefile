export PATH := $(PATH):$(HOME)/.pub-cache/bin:.

SDK = /usr/lib/dart
PUB = $(SDK)/bin/pub 
DART = $(SDK)/bin/dart
DDC = $(SDK)/bin/dartdevc
 


.PHONY = clean release debug	

clean:
	-rm -fr build/

release:
	webdev build --release -o web:build


debug:
	${PUB} build --mode debug

upgrade:
	${PUB} upgrade
#--enable-concrete-type-inference
#--enable-checked-mode 
#--minify

web/patches.dart::
	./combine_patches.py examples/*.whp >$@

get:
	${PUB} get
	${PUB} global activate webdev

serve:
	webdev serve web/ 

