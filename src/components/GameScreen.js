// import React from 'react';
import Matter from 'matter-js';
const GameScreen = GameScreen || {};
const cow = require('../cow.png');
const map = require('../map.png');

export default GameScreen.avalanche = function() {

    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Events = Matter.Events,
        Bodies = Matter.Bodies; //TODO research destructuring and use it here

    // create engine
    let engine = Engine.create(),
        world = engine.world;

    // create renderer
    let render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            background: '#CBFF8C',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    let offset = 10,
        options = {
            isStatic: true,
            render: {
              fillStyle: 'transparent'
            }
        };

    world.bodies = [];

    // these static walls will not be rendered in this sprites example, see options
    World.add(world, [
        Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
        Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
        Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
        Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
    ]);

    let stack = Composites.stack(20, 20, 10, 4, 0, 0, function(x, y) {
        if (Common.random() > 0.35) {
            return Bodies.rectangle(x, y, 64, 64, {
                render: {
                    strokeStyle: '#ffffff',
                    sprite: {
                        texture: map
                    }
                }
            });
        } else {
            return Bodies.circle(x, y, 46, {
                density: 0.0005,
                frictionAir: 0.06,
                restitution: 0.3,
                friction: 0.01,
                render: {
                    sprite: {
                        texture: cow
                    }
                }
            });
        }
    });

    // function handleCowClick(bodies) {
    //   bodies.forEach(body => {
    //     if (body.label === 'Circle Body') {
    //       // console.log('circle body !!!', body.label)
    //       console.log(store.getState())
    //       // body.onClick = (e) => {
    //       //   console.log('Cow click!!!')
    //       // }
    //     }
    //   })
    // }
    //
    // handleCowClick(bodies)

    World.add(world, stack);

    // add mouse control
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Events.on(mouseConstraint, 'enddrag', function(event) {
        // shakeScene(engine);
        console.log(event);
    });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        bodies: stack.bodies,
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};